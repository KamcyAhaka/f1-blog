<script setup lang="ts">
import type { Editor } from "@tiptap/core";

type MenuTriggers = { showFontFamilyMenu: boolean; showFontSizeMenu: boolean; showTextStyleMenu: boolean };

type FontFamilyItem = {
	key: string;
	value: string;
};

type TextStyleItem = {
	key: string;
	value: string;
	command: (editor: Editor) => void;
};

const textStyles: TextStyleItem[] = [
	{
		key: "normal",
		value: "normal",
		command: (editor: Editor) => {
			editor.chain().focus().unsetAllMarks().run();
			editor.chain().focus().setParagraph().run();
			editor.chain().focus().setFontSize(`16pt`).run();
		},
	},
	{
		key: "title",
		value: "title",
		command: (editor: Editor) => {
			editor.chain().focus().unsetAllMarks().run();
			editor.chain().focus().setNode("heading", { level: 1 }).run();
			editor.chain().focus().setFontSize(`26pt`).run();
			editor.chain().focus().setBold().run();
		},
	},
	{
		key: "subtitle",
		value: "subtitle",
		command: (editor: Editor) => {
			editor.chain().focus().unsetAllMarks().run();
			editor.chain().focus().setFontSize(`15pt`).run();
			editor.chain().focus().setColor("#777").run();
		},
	},
	{
		key: "heading 1",
		value: "h1",
		command: (editor: Editor) => {
			editor.chain().focus().unsetAllMarks().run();
			editor.chain().focus().setFontSize(`20pt`).run();
		},
	},
	{
		key: "heading 2",
		value: "h2",
		command: (editor: Editor) => {
			editor.chain().focus().unsetAllMarks().run();
			editor.chain().focus().setFontSize(`16pt`).run();
		},
	},
	{
		key: "heading 3",
		value: "h3",
		command: (editor: Editor) => {
			editor.chain().focus().unsetAllMarks().run();
			editor.chain().focus().setFontSize(`14pt`).run();
		},
	},
];

const fontFamily: FontFamilyItem[] = [
	{
		key: "arial",
		value: "Arial",
	},
	{
		key: "inter",
		value: "Inter",
	},
	{
		key: "serif",
		value: "serif",
	},
	{
		key: "monospace",
		value: "monospace",
	},
	{
		key: "cursive",
		value: "cursive",
	},
	{
		key: "comic sans",
		value: "Comic Sans MS, Comic Sans",
	},
];

const textColor = ref("#000");
const menuTriggers = reactive<MenuTriggers>({
	showFontFamilyMenu: false,
	showFontSizeMenu: false,
	showTextStyleMenu: false,
});
const textStyleChoice = ref("Normal");
const fontFamilyChoice = ref("Arial");
const fontSize = ref("16");

// Ideally this should come from a server or a seperate exported type
const fontSizes = ["10", "12", "14", "16", "20", "24", "26", "30", "32", "36", "40", "44", "48", "52"];

function getCapitalizedKey(key: string) {
	if (!key) return "";
	return key.charAt(0).toUpperCase() + key.slice(1);
}

function toggleMenu(clickedTrigger: keyof MenuTriggers) {
	if (menuTriggers[clickedTrigger]) {
		menuTriggers[clickedTrigger] = false;
	} else {
		// Close all other menus before opening the clicked one
		Object.keys(menuTriggers).forEach((key) => {
			menuTriggers[key as keyof MenuTriggers] = false; // Close all other menus
		});
		menuTriggers[clickedTrigger] = true; // Open the clicked menu
	}
}

function selectFontFamily(item: FontFamilyItem) {
	fontFamilyChoice.value = getCapitalizedKey(item.key);
	props.editor.chain().focus().setFontFamily(item.value).run();
}

function selectFontSize(size: string) {
	fontSize.value = size;
	props.editor.chain().focus().setFontSize(`${fontSize.value}pt`).run();
}

function handleColorChange(color: string) {
	textColor.value = color;
	props.editor.chain().focus().setColor(textColor.value).run();
}

function applyTextStyle(item: TextStyleItem) {
	if (props.editor) {
		item.command(props.editor); // Apply the selected text style command
		const currentFontSize = props.editor.getAttributes("textStyle").fontSize;
		fontSize.value = currentFontSize ? currentFontSize.replace("pt", "") : fontSize.value;
		textStyleChoice.value = getCapitalizedKey(item.key); // Update selected style
		toggleMenu("showTextStyleMenu"); // Close the menu after applying
	}
}

function resetTextColor() {
	handleColorChange("#000");
}
defineEmits(["toggle-link", "color-updated"]);

const props = defineProps<{
	editor: Editor;
}>();
</script>
<template>
	<div v-if="editor" class="menu-controls text-smctext-headline tems-center flex gap-3 rounded-xl px-2.5">
		<div class="text-formatting-btns">
			<button
				title="Bold"
				:disabled="!editor.can().chain().focus().toggleBold().run()"
				:class="{ 'is-active': editor.isActive('bold') }"
				@click="editor.chain().focus().toggleBold().run()"
			>
				<Icon name="ph:text-bolder" :size="22" weight="regular" />
			</button>
			<button
				title="Italic"
				:disabled="!editor.can().chain().focus().toggleItalic().run()"
				:class="{ 'is-active': editor.isActive('italic') }"
				@click="editor.chain().focus().toggleItalic().run()"
			>
				<Icon name="ph:text-italic " :size="22" weight="regular" />
			</button>
			<button
				title="Underline"
				:class="{ 'is-active': editor.isActive('underline') }"
				@click="editor.chain().focus().toggleUnderline().run()"
			>
				<ph-text-underline :size="22" weight="regular" />
			</button>
			<button
				title="Underline"
				:class="{ 'is-active': editor.isActive('underline') }"
				@click="editor.chain().focus().toggleUnderline().run()"
			>
				<Icon name="ph:caret-down" :size="22" weight="regular" />
			</button>
		</div>
		<div class="color-formatting-btns">
			<button
				title="Highlight"
				:class="{ 'is-active': editor.isActive('highlight') }"
				@click="editor.chain().focus().toggleHighlight().run()"
			>
				<Icon name="ph:highlighter" :size="22" weight="regular" />
			</button>
			<button
				id="text-color-indicator"
				title="Change text color"
				:class="{ 'is-active': editor.isActive('textStyle') }"
				class="flex flex-col justify-end"
				@click="resetTextColor"
			>
				<IconLetterA />
				<color-picker v-model="textColor" label="Select color" @color-changed="handleColorChange" @click.stop />
			</button>
		</div>
		<div class="text-style-btn relative">
			<button title="Change text style" class="flex min-w-[136px] items-center justify-between gap-6">
				{{ textStyleChoice }}
				<Icon
					name="ph:caret-down"
					:size="22"
					weight="regular"
					class="transition duration-300"
					:class="menuTriggers.showTextStyleMenu ? 'rotate-180' : ''"
					@click.stop="toggleMenu('showTextStyleMenu')"
				/>
			</button>
			<editor-sub-menu v-show="menuTriggers.showTextStyleMenu">
				<button
					v-for="(item, index) in textStyles"
					:key="index"
					class="border-y border-gray-200 px-5 py-3 text-left"
					@click="applyTextStyle(item)"
				>
					{{ getCapitalizedKey(item.key) }}
				</button>
			</editor-sub-menu>
		</div>
		<div class="font-family-btn relative">
			<button title="Change font family" class="flex min-w-[144px] items-center justify-between gap-6">
				{{ fontFamilyChoice }}
				<Icon
					name="ph:caret-down"
					:size="22"
					weight="regular"
					class="transition duration-300"
					:class="menuTriggers.showFontFamilyMenu ? 'rotate-180' : ''"
					@click.stop="toggleMenu('showFontFamilyMenu')"
				/>
			</button>
			<editor-sub-menu v-show="menuTriggers.showFontFamilyMenu">
				<button
					v-for="(item, index) in fontFamily"
					:key="index"
					class="border-y border-gray-200 px-5 py-3 text-left"
					:class="{ 'is-active': editor.isActive('textStyle', { fontFamily: item.value }) }"
					@click="selectFontFamily(item)"
				>
					{{ getCapitalizedKey(item.key) }}
				</button>
			</editor-sub-menu>
		</div>
		<div class="font-size-btn relative">
			<button title="Change font family" class="flex items-center justify-between gap-6">
				{{ fontSize }}
				<Icon
					name="ph:caret-down"
					:size="22"
					weight="regular"
					class="transition duration-300"
					:class="menuTriggers.showFontSizeMenu ? 'rotate-180' : ''"
					@click.stop="toggleMenu('showFontSizeMenu')"
				/>
			</button>
			<editor-sub-menu v-show="menuTriggers.showFontSizeMenu">
				<button
					v-for="(size, index) in fontSizes"
					:key="index"
					class="border-y border-gray-200 px-5 py-3 text-left"
					:class="{ 'is-active': editor.isActive('textStyle', { fontSize: size }) }"
					@click="selectFontSize(size)"
				>
					{{ size }}
				</button>
			</editor-sub-menu>
		</div>
		<div class="text-alignment-btns">
			<button
				title="Align left"
				:class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
				@click="editor.chain().focus().setTextAlign('left').run()"
			>
				<Icon name="ph:text-align-left" :size="22" weight="regular" />
			</button>
			<button
				title="Align center"
				:class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
				@click="editor.chain().focus().setTextAlign('center').run()"
			>
				<Icon name="ph:text-align-center" :size="22" weight="regular" />
			</button>
			<button
				title="Align right"
				:class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
				@click="editor.chain().focus().setTextAlign('right').run()"
			>
				<ph-text-align-right :size="22" weight="regular" />
			</button>
			<button
				title="Align justify"
				:class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
				@click="editor.chain().focus().setTextAlign('justify').run()"
			>
				<Icon name="ph:text-align-justify" :size="22" weight="regular" />
			</button>
			<button title="Unset align" @click="editor.chain().focus().unsetTextAlign().run()">
				<IconLineUnsetTextAlign />
			</button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.menu-controls {
	@apply bg-[#F8F9FB];

	& > div {
		@apply flex justify-center gap-2.5 rounded-[14px];
	}

	& > div > button {
		@apply cursor-pointer rounded-md p-2;

		&.is-active,
		&:hover {
			@apply border-white bg-white;
		}
	}

	#text-color-indicator {
		@apply p-1;
	}
}
</style>
