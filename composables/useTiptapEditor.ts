import { ref } from "vue";
import { useEditor, type Editor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { CharacterCount } from "@tiptap/extension-character-count";
import { TextAlign } from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Text from "@tiptap/extension-text";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Gapcursor from "@tiptap/extension-gapcursor";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Placeholder from "@tiptap/extension-placeholder";
import TableRow from "@tiptap/extension-table-row";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextSize from "tiptap-extension-font-size";
import DOMPurify from "dompurify";

const characterCount = ref("0");
const wordCount = ref("0");
const cleanContent = ref("");

export default function useTiptapEditor(initialContent: string) {
	const tiptap = useEditor({
		content: initialContent,
		extensions: [
			StarterKit,
			Underline,
			CharacterCount.configure({
				mode: "textSize",
			}),
			TextAlign.configure({
				types: ["heading", "paragraph"],
				alignments: ["left", "right", "justify", "center"],
			}),
			Superscript,
			Subscript,
			Highlight,
			Color,
			Image,
			Dropcursor,
			Typography,
			Text,
			TextStyle,
			TextSize,
			FontFamily,
			TaskList,
			TaskItem.configure({
				nested: true,
			}),
			Gapcursor,
			Table.configure({
				resizable: true,
			}),
			TableCell,
			TableHeader,
			TableRow,
			Link.configure({
				defaultProtocol: "https",
				openOnClick: false,
				autolink: true,
			}),
			Placeholder.configure({
				// Use a placeholder:
				placeholder: "Content goes here...",
				// Use different placeholders depending on the node type:
				// placeholder: ({ node }) => {
				//   if (node.type.name === 'heading') {
				//     return 'What’s the title?'
				//   }

				//   return 'Can you add some further context?'
				// },
			}),
		],
		autofocus: "end",
		editable: true,
		onCreate({ editor }) {
			cleanContent.value = getDocument(editor as Editor);
			characterCount.value = editor.storage.characterCount.characters();

			wordCount.value = editor.storage.characterCount.words();
		},
		onUpdate({ editor }) {
			cleanContent.value = getDocument(editor as Editor);
			characterCount.value = editor.storage.characterCount.characters();

			wordCount.value = editor.storage.characterCount.words();
		},
	});

	const editorActions = {
		insertTitleAndBody() {
			tiptap.value
				?.chain()
				.focus()
				.insertContent([
					{
						type: "heading",
						attrs: {
							level: 1,
						},
						content: [
							{
								type: "text",
								text: "Example Text",
							},
						],
					},
					{
						type: "paragraph",
						content: [
							{
								type: "text",
								text: "Lorem ipsum dolor sit amet...",
							},
						],
					},
				])
				.run();
		},

		insertTitleSubtitleAndBody() {
			tiptap.value
				?.chain()
				.focus()
				.insertContent([
					{
						type: "heading",
						attrs: {
							level: 1,
						},
						content: [
							{
								type: "text",
								text: "Example Text",
							},
						],
					},
					{
						type: "paragraph",
						content: [
							{
								type: "text",
								text: "Lorem ipsum dolor sit amet...",
							},
						],
					},
				])
				.run();
		},
	};

	return { tiptap, characterCount, wordCount, cleanContent, editorActions };
}

function getDocument(editor: Editor) {
	// Your getDocument logic here
	const content = editor.getHTML();
	const clean = DOMPurify.sanitize(content);
	return clean;
}
