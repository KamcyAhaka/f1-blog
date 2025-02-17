<script setup lang="ts">
import type { Editor } from "@tiptap/core";
import { BubbleMenu } from "@tiptap/vue-3";

defineProps<{
	editor: Editor;
}>();
</script>
<template>
	<BubbleMenu
		v-if="editor"
		class="bubble-menu overflow-scroll whitespace-nowrap shadow-md"
		:editor="editor"
		:tippy-options="{ duration: 100, offset: [0, -70] }"
	>
		<button
			title="Bold"
			:disabled="!editor.can().chain().focus().toggleBold().run()"
			:class="{ 'is-active': editor.isActive('bold') }"
			@click="editor.chain().focus().toggleBold().run()"
		>
			<Icon name="ph:text-bolder" :size="22" weight="bold" />
		</button>
		<button
			title="Italic"
			:disabled="!editor.can().chain().focus().toggleItalic().run()"
			:class="{ 'is-active': editor.isActive('italic') }"
			@click="editor.chain().focus().toggleItalic().run()"
		>
			<Icon name="ph:text-italic" :size="22" weight="bold" />
		</button>
		<button
			title="Strikethrough"
			:disabled="!editor.can().chain().focus().toggleStrike().run()"
			:class="{ 'is-active': editor.isActive('strike') }"
			@click="editor.chain().focus().toggleStrike().run()"
		>
			<Icon name="ph:text-strikethrough " :size="22" weight="bold" />
		</button>
		<div class="icon" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">h1</div>
		<div class="icon" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">h2</div>
		<div class="icon" @click="editor.chain().focus().toggleCode().run()">
			<button
				title="Code"
				:disabled="!editor.can().chain().focus().toggleCode().run()"
				:class="{ 'is-active': editor.isActive('code') }"
				@click="editor.chain().focus().toggleCode().run()"
			>
				<Icon name="ph:code-simple" :size="22" weight="bold" />
			</button>
		</div>
		<button class="icon" @click="editor.chain().focus().unsetColumns().run()">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="icon icon-tabler icon-tabler-layout-off"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="#0a0a0a"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path
					d="M8 4a2 2 0 0 1 2 2m-1.162 2.816a1.993 1.993 0 0 1 -.838 .184h-2a2 2 0 0 1 -2 -2v-1c0 -.549 .221 -1.046 .58 -1.407"
				/>
				<path d="M4 13m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
				<path
					d="M14 10v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v10m-.595 3.423a2 2 0 0 1 -1.405 .577h-2a2 2 0 0 1 -2 -2v-4"
				/>
				<path d="M3 3l18 18" />
			</svg>
		</button>
	</BubbleMenu>
</template>

<style lang="scss" scoped>
/* Bubble menu */
.bubble-menu {
	@apply border border-gray-100 shadow-md;

	background-color: #ffffff;
	border-radius: 0.7rem;
	display: flex;
	gap: 1em;

	padding: 0.5rem;

	button {
		background-color: unset;

		&:hover {
			background-color: var(--gray-3);
		}

		&.is-active {
			background-color: var(--purple);

			&:hover {
				background-color: var(--purple-contrast);
			}
		}
	}
}
</style>
