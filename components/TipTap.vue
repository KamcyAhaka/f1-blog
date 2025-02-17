<script setup lang="ts">
import { ref, defineEmits, watch, onMounted } from "vue";
import type { Editor } from "@tiptap/vue-3";
import { EditorContent } from "@tiptap/vue-3";

const props = defineProps<{
	modelValue: string;
}>();

// Emits
const emit = defineEmits(["editor-update", "articleSubmission", "update:modelValue"]);

const { tiptap, characterCount, wordCount, cleanContent, editorActions } = useTiptapEditor(props.modelValue);

// Expose insertTitleAndBody to the parent
defineExpose({
	editorActions,
});

// const editorDocument = ref(getDocument())
const showLinkModal = ref(false);
const linkDisplayText = ref("");
const linkText = ref("");

// Watch for changes in cleanContent and emit updates
watch(cleanContent, (newContent) => {
	emit("update:modelValue", newContent);
});

// Update the editor content when modelValue changes (from the parent)
watch(
	() => props.modelValue,
	(newValue) => {
		if (tiptap.value && tiptap.value.getHTML() !== newValue) {
			tiptap.value.commands.setContent(newValue);
		}
	},
);

// Initialize the editor content with modelValue on mount
onMounted(() => {
	if (tiptap.value && props.modelValue) {
		tiptap.value.commands.setContent(props.modelValue);
		console.log(cleanContent.value);
	}
});

function getSelection() {
	const { view, state } = tiptap.value as Editor;
	const { from, to } = view.state.selection;
	return state.doc.textBetween(from, to, " ");
}

function getTextAtCursorPosition() {
	// TODO: Get the text at the cursor's location
}

function toggleLink() {
	const selection = getSelection();

	getTextAtCursorPosition();

	if (selection.trim() !== "") {
		linkDisplayText.value = selection;
	} else {
		// linkDisplayText.value = editor.value!.st
	}

	linkText.value = tiptap.value!.getAttributes("link").href;

	showLinkModal.value = true;
}

// Handle the confirm event
function handleDialogConfirm() {
	tiptap.value
		?.chain()
		.focus()
		.insertContent(`<a href="${linkText.value}">${linkDisplayText.value || linkText.value}</a>`)
		.run();

	showLinkModal.value = false; // Close the dialog
	linkDisplayText.value = ""; // Clear the display text when the modal closes
	linkText.value = ""; // Clear the link text when the modal closes
}

// Handle the cancel event
function handleDialogCancel() {
	showLinkModal.value = false;
	linkDisplayText.value = ""; // Clear the display text when the modal closes
	linkText.value = ""; // Clear the link text when the modal closes
}
</script>

<template>
	<div class="tiptap-wrapper flex w-full flex-col items-center gap-1 text-left">
		<tip-tap-controls :editor="tiptap!" @toggle-link="toggleLink" />
		<editor-content class="min-h-[70svh] w-full overflow-scroll p-5" :editor="tiptap" />
		<tip-tap-hover-menu :editor="tiptap!" />

		<p class="character-count pointer-events-none mt-5 text-center text-xs text-gray-500">
			{{ characterCount }} characters / {{ wordCount }} words
		</p>

		<sm-dialog-confirmation
			v-model="showLinkModal"
			title="Insert Link"
			@on-confirm="handleDialogConfirm"
			@on-cancel="handleDialogCancel"
		>
			<div class="input-container">
				<sm-input id="link-display-text" v-model="linkDisplayText" label="Text" type="text" name="" />

				<sm-input id="link-text" v-model="linkText" label="Link" type="text" name="" />
			</div>
		</sm-dialog-confirmation>
	</div>
</template>

<style lang="scss">
@import "~/assets/simple-editor.scss";
</style>
