<template>
  <div class="tiptap-wrapper w-[90%]">
    <div
      class="menu-controls flex items-center gap-2 bg-gray-800 text-white rounded-t-lg overflow-scroll whitespace-nowrap text-center shadow-md"
      v-if="editor"
    >
      <div class="text-formatting-btns">
        <button
          title="Bold"
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          <client-only>
            <font-awesome-icon :icon="['fas', 'bold']" />
          </client-only>
        </button>
        <button
          title="Italic"
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          <client-only>
            <font-awesome-icon :icon="['fas', 'italic']" />
          </client-only>
        </button>
        <button
          title="Underline"
          @click="editor.chain().focus().toggleUnderline().run()"
          :class="{ 'is-active': editor.isActive('underline') }"
        >
          <client-only>
            <font-awesome-icon :icon="['fas', 'underline']" />
          </client-only>
        </button>
        <button
          title="Strikethrough"
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          <client-only>
            <font-awesome-icon :icon="['fas', 'strikethrough']" />
          </client-only>
        </button>
      </div>

      <div class="text-alignment-btns">
        <button
          title="Align left"
          @click="editor.chain().focus().setTextAlign('left').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        >
          <client-only>
            <font-awesome-icon :icon="['fas', 'align-left']" />
          </client-only>
        </button>
        <button
          title="Align right"
          @click="editor.chain().focus().setTextAlign('right').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        >
          <client-only>
            <font-awesome-icon :icon="['fas', 'align-right']" />
          </client-only>
        </button>
        <button
          title="Align justify"
          @click="editor.chain().focus().setTextAlign('justify').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
        >
          <client-only>
            <font-awesome-icon :icon="['fas', 'align-justify']" />
          </client-only>
        </button>
        <button
          title="Align center"
          @click="editor.chain().focus().setTextAlign('center').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        >
          <client-only>
            <font-awesome-icon :icon="['fas', 'align-center']" />
          </client-only>
        </button>
        <button
          title="Unset align"
          @click="editor.chain().focus().unsetTextAlign().run()"
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            id="align-left-slash"
            data-name="Flat Line"
            xmlns="http://www.w3.org/2000/svg"
            class="icon flat-line"
          >
            <path
              id="primary"
              d="M21,6H18M12,6H3m14,6H12M6,12H3m18,6H6M21,3,3,21"
              style="fill: none; stroke: #ffffff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"
            ></path>
          </svg>
        </button>
      </div>
      <div class="list-formatting-btns">
        <button
          title="Bullet list"
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          <client-only>
            <font-awesome-icon :icon="['fas', 'list']" />
          </client-only>
        </button>
        <button
          title="Number list"
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          <client-only>
            <font-awesome-icon :icon="['fas', 'list-ol']" />
          </client-only>
        </button>
      </div>
      <div class="code-formatting-btns">
        <button
          title="Code"
          @click="editor.chain().focus().toggleCode().run()"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
        >
          <client-only>
            <font-awesome-icon :icon="['fas', 'code']" />
          </client-only>
        </button>
        <button
          title="Code block"
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
        >
          <svg
            width="18px"
            height="18px"
            viewBox="0 0 16 16"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              fill="#fff"
              d="M2.1 3.1c0.2 1.3 0.4 1.6 0.4 2.9 0 0.8-1.5 1.5-1.5 1.5v1c0 0 1.5 0.7 1.5 1.5 0 1.3-0.2 1.6-0.4 2.9-0.3 2.1 0.8 3.1 1.8 3.1s2.1 0 2.1 0v-2c0 0-1.8 0.2-1.8-1 0-0.9 0.2-0.9 0.4-2.9 0.1-0.9-0.5-1.6-1.1-2.1 0.6-0.5 1.2-1.1 1.1-2-0.3-2-0.4-2-0.4-2.9 0-1.2 1.8-1.1 1.8-1.1v-2c0 0-1 0-2.1 0s-2.1 1-1.8 3.1z"
            ></path>
            <path
              fill="#fff"
              d="M13.9 3.1c-0.2 1.3-0.4 1.6-0.4 2.9 0 0.8 1.5 1.5 1.5 1.5v1c0 0-1.5 0.7-1.5 1.5 0 1.3 0.2 1.6 0.4 2.9 0.3 2.1-0.8 3.1-1.8 3.1s-2.1 0-2.1 0v-2c0 0 1.8 0.2 1.8-1 0-0.9-0.2-0.9-0.4-2.9-0.1-0.9 0.5-1.6 1.1-2.1-0.6-0.5-1.2-1.1-1.1-2 0.2-2 0.4-2 0.4-2.9 0-1.2-1.8-1.1-1.8-1.1v-2c0 0 1 0 2.1 0s2.1 1 1.8 3.1z"
            ></path>
          </svg>
        </button>
      </div>
      <div class="extra-formatting-btns">
        <button
          title="Clear format"
          @click="editor.chain().focus().unsetAllMarks().run()"
        >
          <client-only>
            <font-awesome-icon :icon="['fas', 'eraser']" />
          </client-only>
        </button>
        <button
          title="Paragraph"
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
        >
          <client-only>
            <font-awesome-icon :icon="['fas', 'paragraph']" />
          </client-only>
        </button>
        <button
          title="Heading 1"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          h1
        </button>
        <button
          title="Heading 2"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          h2
        </button>
        <button
          title="Heading 3"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
          h3
        </button>
        <button
          title="Heading 4"
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        >
          h4
        </button>
        <button
          title="Heading 5"
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        >
          h5
        </button>
        <button
          title="Heading 6"
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        >
          h6
        </button>

        <button
          title="Blockquote"
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
        >
          <svg
            width="22px"
            height="22px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
            class="bi bi-blockquote-left"
          >
            <path
              d="M2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm5 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6zm0 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6zm-5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm.79-5.373c.112-.078.26-.17.444-.275L3.524 6c-.122.074-.272.17-.452.287-.18.117-.35.26-.51.428a2.425 2.425 0 0 0-.398.562c-.11.207-.164.438-.164.692 0 .36.072.65.217.873.144.219.385.328.72.328.215 0 .383-.07.504-.211a.697.697 0 0 0 .188-.463c0-.23-.07-.404-.211-.521-.137-.121-.326-.182-.568-.182h-.282c.024-.203.065-.37.123-.498a1.38 1.38 0 0 1 .252-.37 1.94 1.94 0 0 1 .346-.298zm2.167 0c.113-.078.262-.17.445-.275L5.692 6c-.122.074-.272.17-.452.287-.18.117-.35.26-.51.428a2.425 2.425 0 0 0-.398.562c-.11.207-.164.438-.164.692 0 .36.072.65.217.873.144.219.385.328.72.328.215 0 .383-.07.504-.211a.697.697 0 0 0 .188-.463c0-.23-.07-.404-.211-.521-.137-.121-.326-.182-.568-.182h-.282a1.75 1.75 0 0 1 .118-.492c.058-.13.144-.254.257-.375a1.94 1.94 0 0 1 .346-.3z"
            />
          </svg>
        </button>
        <button
          title="Horizontal line"
          @click="editor.chain().focus().setHorizontalRule().run()"
        >
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="20px"
            height="20px"
            viewBox="0 0 290.658 290.658"
            xml:space="preserve"
          >
            <g>
              <g>
                <rect
                  y="139.474"
                  style="fill:#fff;"
                  width="290.658"
                  height="11.711"
                />
              </g>
            </g>
          </svg>
        </button>
        <button
          title="Hard Break"
          @click="editor.chain().focus().setHardBreak().run()"
        >
          <svg
            fill="#ffffff"
            height="20px"
            width="20px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 408.105 408.105"
            xml:space="preserve"
          >
            <g>
              <path d="M364.479,0c-4.143,0-7.5,3.357-7.5,7.5v159.924H91.065V7.5c0-4.143-3.358-7.5-7.5-7.5s-7.5,3.357-7.5,7.5v167.424
      c0,4.143,3.358,7.5,7.5,7.5h280.914c4.143,0,7.5-3.357,7.5-7.5V7.5C371.979,3.357,368.621,0,364.479,0z" />
              <path d="M152.219,15h20c4.142,0,7.5-3.358,7.5-7.5c0-4.143-3.358-7.5-7.5-7.5h-20c-4.142,0-7.5,3.357-7.5,7.5
      C144.719,11.642,148.077,15,152.219,15z" />
              <path d="M112.219,15h20c4.142,0,7.5-3.358,7.5-7.5c0-4.143-3.358-7.5-7.5-7.5h-20c-4.142,0-7.5,3.357-7.5,7.5
      C104.719,11.642,108.077,15,112.219,15z" />
              <path d="M192.219,15h20c4.143,0,7.5-3.358,7.5-7.5c0-4.143-3.357-7.5-7.5-7.5h-20c-4.142,0-7.5,3.357-7.5,7.5
      C184.719,11.642,188.077,15,192.219,15z" />
              <path d="M272.219,15h20c4.143,0,7.5-3.358,7.5-7.5c0-4.143-3.357-7.5-7.5-7.5h-20c-4.143,0-7.5,3.357-7.5,7.5
      C264.719,11.642,268.076,15,272.219,15z" />
              <path d="M232.219,15h20c4.143,0,7.5-3.358,7.5-7.5c0-4.143-3.357-7.5-7.5-7.5h-20c-4.143,0-7.5,3.357-7.5,7.5
      C224.719,11.642,228.076,15,232.219,15z" />
              <path d="M312.219,15h20c4.143,0,7.5-3.358,7.5-7.5c0-4.143-3.357-7.5-7.5-7.5h-20c-4.143,0-7.5,3.357-7.5,7.5
      C304.719,11.642,308.076,15,312.219,15z" />
              <path d="M364.479,225.68H83.565c-4.142,0-7.5,3.357-7.5,7.5v167.426c0,4.143,3.358,7.5,7.5,7.5s7.5-3.357,7.5-7.5V240.68h265.914
      v159.926c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5V233.18C371.979,229.037,368.621,225.68,364.479,225.68z" />
              <path d="M252.824,393.105h-20c-4.143,0-7.5,3.357-7.5,7.5c0,4.143,3.357,7.5,7.5,7.5h20c4.143,0,7.5-3.357,7.5-7.5
      C260.324,396.463,256.967,393.105,252.824,393.105z" />
              <path d="M292.824,393.105h-20c-4.143,0-7.5,3.357-7.5,7.5c0,4.143,3.357,7.5,7.5,7.5h20c4.143,0,7.5-3.357,7.5-7.5
      C300.324,396.463,296.967,393.105,292.824,393.105z" />
              <path d="M332.824,393.105h-20c-4.143,0-7.5,3.357-7.5,7.5c0,4.143,3.357,7.5,7.5,7.5h20c4.143,0,7.5-3.357,7.5-7.5
      C340.324,396.463,336.967,393.105,332.824,393.105z" />
              <path d="M132.824,393.105h-20c-4.142,0-7.5,3.357-7.5,7.5c0,4.143,3.358,7.5,7.5,7.5h20c4.142,0,7.5-3.357,7.5-7.5
      C140.324,396.463,136.966,393.105,132.824,393.105z" />
              <path d="M212.824,393.105h-20c-4.142,0-7.5,3.357-7.5,7.5c0,4.143,3.358,7.5,7.5,7.5h20c4.143,0,7.5-3.357,7.5-7.5
      C220.324,396.463,216.967,393.105,212.824,393.105z" />
              <path d="M172.824,393.105h-20c-4.142,0-7.5,3.357-7.5,7.5c0,4.143,3.358,7.5,7.5,7.5h20c4.142,0,7.5-3.357,7.5-7.5
      C180.324,396.463,176.966,393.105,172.824,393.105z" />
              <path d="M81.573,204.053c0-2.348-1.1-4.561-2.971-5.979L48.156,175.01c-2.27-1.719-5.318-2.006-7.867-0.737
      c-2.55,1.267-4.162,3.868-4.162,6.716v46.129c0,2.848,1.612,5.449,4.162,6.716c1.057,0.525,2.2,0.784,3.337,0.784
      c1.606,0,3.201-0.516,4.53-1.521l30.446-23.064C80.474,208.613,81.573,206.4,81.573,204.053z M51.127,212.026v-15.947l10.526,7.974
      L51.127,212.026z" />
            </g>
          </svg>
        </button>
        <button
          title="Undo"
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()"
        >
          <client-only>
            <font-awesome-icon :icon="['fas', 'rotate-left']" />
          </client-only>
        </button>
        <button
          title="Redo"
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()"
        >
          <client-only>
            <font-awesome-icon :icon="['fas', 'rotate-right']" />
          </client-only>
        </button>
      </div>

    </div>
    <editor-content
      class="border-2 border-gray-800 h-[70svh] overflow-scroll p-5"
      :editor="editor"
    />
    <p class="text-center mt-5 character-count text-xs text-gray-500 pointer-events-none">
      {{ editor?.storage.characterCount.characters() }} characters / {{ editor?.storage.characterCount.words() }} words
    </p>
    <CallToAction
      button-text="Create Post"
      class="bg-gray-800 text-white my-3 w-full"
      @click="$emit('articleSubmission', getDocument())"
    />
  </div>
</template>

<script
  setup
  lang="ts"
>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Underline } from "@tiptap/extension-underline";
import { CharacterCount } from "@tiptap/extension-character-count";
import { TextAlign } from "@tiptap/extension-text-align";
import DOMPurify from "dompurify";

const editor = useEditor({
  content: '',
  extensions: [
    StarterKit,
    Underline,
    CharacterCount,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
      alignments: ['left', 'right', 'justify', 'center']
    })
  ],
  autofocus: "end"
})

const editorDocument = ref('')

const getDocument = () => {
  // Your getDocument logic here
  const content = editor.value?.getHTML() as string;
  const clean = DOMPurify.sanitize(content);
  return clean;
};

</script>

<style lang="scss">
/* Basic editor styles */
.tiptap {
  outline: none;


  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}

.menu-controls {
  & > * {
    @apply flex items-center justify-center gap-3 px-3 py-2 border-r border-gray-400;
  }
}
</style>
