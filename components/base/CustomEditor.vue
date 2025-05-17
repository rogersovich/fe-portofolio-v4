<template>
  <div v-if="editor" class="relative">
    <div class="control-group mb-3 rounded-lg py-3">
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="tiptap-control-button"
          @click="toggleHeadingVariant"
        >
          <IconHeading class="size-5" />
        </button>
        <Popover ref="opHeading">
          <div class="flex items-center gap-3">
            <button
              type="button"
              @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
              :class="{
                'tiptap-control-button--active': editor.isActive('heading', {
                  level: 1,
                }),
              }"
              class="tiptap-control-button"
            >
              <IconH1 class="size-5" />
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
              :class="{
                'tiptap-control-button--active': editor.isActive('heading', {
                  level: 2,
                }),
              }"
              class="tiptap-control-button"
            >
              <IconH2 class="size-5" />
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
              :class="{
                'tiptap-control-button--active': editor.isActive('heading', {
                  level: 3,
                }),
              }"
              class="tiptap-control-button"
            >
              <IconH3 class="size-5" />
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
              :class="{
                'tiptap-control-button--active': editor.isActive('heading', {
                  level: 4,
                }),
              }"
              class="tiptap-control-button"
            >
              <IconH4 class="size-5" />
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
              :class="{
                'tiptap-control-button--active': editor.isActive('heading', {
                  level: 5,
                }),
              }"
              class="tiptap-control-button"
            >
              <IconH5 class="size-5" />
            </button>
          </div>
        </Popover>
        <button
          type="button"
          class="tiptap-control-button"
          @click="toggleTextFormat"
        >
          <IconTypeface class="size-5" />
        </button>
        <Popover ref="opTextFormat">
          <div class="flex items-center gap-3">
            <button
              type="button"
              @click="editor.chain().focus().toggleBold().run()"
              :class="{
                'tiptap-control-button--active': editor.isActive('bold'),
              }"
              class="tiptap-control-button"
            >
              <IconBold class="size-5" />
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleCode().run()"
              :class="{
                'tiptap-control-button--active': editor.isActive('code'),
              }"
              class="tiptap-control-button"
            >
              <IconCode class="size-5" />
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleUnderline().run()"
              :class="{
                'tiptap-control-button--active': editor.isActive('underline'),
              }"
              class="tiptap-control-button"
            >
              <IconUnderline class="size-5" />
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleItalic().run()"
              :class="{
                'tiptap-control-button--active': editor.isActive('italic'),
              }"
              class="tiptap-control-button"
            >
              <IconItalic class="size-5" />
            </button>
          </div>
        </Popover>
        <button
          type="button"
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{
            'tiptap-control-button--active': editor.isActive('bulletList'),
          }"
          class="tiptap-control-button"
        >
          <IconList class="size-5" />
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{
            'tiptap-control-button--active': editor.isActive('orderedList'),
          }"
          class="tiptap-control-button"
        >
          <IconListNumbers class="size-5" />
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{
            'tiptap-control-button--active': editor.isActive('blockquote'),
          }"
          class="tiptap-control-button"
        >
          <IconQuoteFilled class="size-5" />
        </button>

        <button
          type="button"
          @click="editor.chain().focus().toggleHighlight().run()"
          :class="{
            'tiptap-control-button--active': editor.isActive('highlight'),
          }"
          class="tiptap-control-button"
        >
          <IconHighlight class="size-5" />
        </button>
        <button
          type="button"
          @click="editor.chain().focus().setHorizontalRule().run()"
          class="tiptap-control-button"
        >
          <IconSeparator class="size-5" />
        </button>
        <button
          type="button"
          class="tiptap-control-button"
          @click="toggleTextAlign"
        >
          <IconLetterT class="size-5" />
        </button>
        <Popover ref="opTextAlign">
          <div class="flex items-center gap-3">
            <button
              type="button"
              @click="editor.chain().focus().toggleTextAlign('left').run()"
              :class="{
                'tiptap-control-button--active': editor.isActive({
                  textAlign: 'left',
                }),
              }"
              class="tiptap-control-button"
            >
              <IconAlignLeft class="size-5" />
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleTextAlign('center').run()"
              :class="{
                'tiptap-control-button--active': editor.isActive({
                  textAlign: 'center',
                }),
              }"
              class="tiptap-control-button"
            >
              <IconAlignCenter class="size-5" />
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleTextAlign('right').run()"
              :class="{
                'tiptap-control-button--active': editor.isActive({
                  textAlign: 'right',
                }),
              }"
              class="tiptap-control-button"
            >
              <IconAlignRight class="size-5" />
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleTextAlign('justify').run()"
              :class="{
                'tiptap-control-button--active': editor.isActive({
                  textAlign: 'justify',
                }),
              }"
              class="tiptap-control-button"
            >
              <IconAlignJustified class="size-5" />
            </button>
          </div>
        </Popover>
        <button
          type="button"
          @click="setLink"
          :class="{ 'tiptap-control-button--active': editor.isActive('link') }"
          class="tiptap-control-button"
        >
          <IconLink class="size-5" />
        </button>
        <button
          type="button"
          @click="editor.chain().focus().unsetLink().run()"
          :disabled="!editor.isActive('link')"
          class="tiptap-control-button"
        >
          <IconLinkOff class="size-5" />
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{
            'tiptap-control-button--active': editor.isActive('codeBlock'),
          }"
          class="tiptap-control-button"
        >
          <IconBracketsAngle class="size-5" />
        </button>
        <template v-if="!$props.exclude.includes('image')">
          <button
            type="button"
            @click="selectImage()"
            class="tiptap-control-button"
          >
            <IconPhotoFilled class="size-5" />
          </button>
        </template>
      </div>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import Image from "@tiptap/extension-image";
import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import go from "highlight.js/lib/languages/go";
import nginx from "highlight.js/lib/languages/nginx";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import yaml from "highlight.js/lib/languages/yaml";
import sql from "highlight.js/lib/languages/sql";
import php from "highlight.js/lib/languages/php";
import clean from "highlight.js/lib/languages/clean";
import { all, createLowlight } from "lowlight";
import {
  IconQuoteFilled,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconListNumbers,
  IconList,
  IconPhotoFilled,
  IconBold,
  IconCode,
  IconHeading,
  IconItalic,
  IconUnderline,
  IconHighlight,
  IconSeparator,
  IconTypeface,
  IconAlignLeft,
  IconAlignRight,
  IconAlignCenter,
  IconAlignJustified,
  IconLetterT,
  IconLink,
  IconLinkOff,
  IconBracketsAngle
} from "@tabler/icons-vue";

const lowlight = createLowlight(all);

// you can also register languages
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);
lowlight.register("go", go);
lowlight.register("nginx", nginx);
lowlight.register("dockerfile", dockerfile);
lowlight.register("yaml", yaml);
lowlight.register("sql", sql);
lowlight.register("php", php);
lowlight.register("clean", clean);

export default {
  components: {
    EditorContent,
    IconQuoteFilled,
    IconH1,
    IconH2,
    IconH3,
    IconH4,
    IconH5,
    IconListNumbers,
    IconList,
    IconPhotoFilled,
    IconBold,
    IconCode,
    IconHeading,
    IconItalic,
    IconUnderline,
    IconHighlight,
    IconSeparator,
    IconTypeface,
    IconAlignLeft,
    IconAlignRight,
    IconAlignCenter,
    IconAlignJustified,
    IconLetterT,
    IconLink,
    IconLinkOff,
    IconBracketsAngle,
  },

  props: {
    modelValue: {
      type: String,
      default: "",
    },
    errMessage: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    exclude: {
      type: Array,
      default: () => [],
    },
    uploadUrlAPI: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue"],

  methods: {
    // Select an image file
    selectImage() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";

      input.onchange = async () => {
        const file = input.files?.[0];
        if (file) {
          // Handle the image upload

          const uploadedImage = await this.uploadImage(file);
          if (uploadedImage) {
            // const imageUrl =
            //   "http://localhost:9000/portofolio-v4/blog/1745223221_44a8a312-d6d8-42af-8eab-7a8f01ad02ad.jpg";
            const imageUrl = uploadedImage.image_url;

            // Insert the image into the editor
            this.insertImage(imageUrl);
          }
        }
      };

      input.click();
    },
    async uploadImage(file) {
      const axios = useAxios();
      const alertStore = useAlertStore();
      const authStore = useAuthStore();

      const formData = new FormData();
      formData.append("image_file", file);

      try {
        const { data } = await axios.post(
          `/api/${this.$props.uploadUrlAPI}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${authStore.getToken()}`,
            },
          }
        );

        const res = data.data;

        return {
          image_file_name: res.image_file_name,
          image_url: res.image_url,
        };
      } catch (error) {
        console.error(error);
        const errData = error.response.data;
        alertStore.setAlert({
          severity: "error",
          summary: errData.message,
          show_alert: true,
        });
        return null;
      }
    },
    insertImage(url) {
      if (this.editor) {
        this.editor
          .chain()
          .focus()
          .setImage({
            src: url,
            alt: "A image",
          })
          .run();
      }
    },
    toggleHeadingVariant(event) {
      if (this.opHeading) {
        this.opHeading.toggle(event);
      }
    },

    toggleTextFormat(event) {
      if (this.opTextFormat) {
        this.opTextFormat.toggle(event);
      }
    },

    toggleTextAlign(event) {
      if (this.opTextAlign) {
        this.opTextAlign.toggle(event);
      }
    },

    setLink() {
      const previousUrl = this.editor.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        this.editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }

      // update link
      this.editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    },

    setEditorContentError() {
      this.editor.setOptions({
        editorProps: {
          attributes: {
            class: "tiptap-content--error",
          },
        },
      });
    },

    setEditorContentNormal() {
      this.editor.setOptions({
        editorProps: {
          attributes: {
            class: "tiptap-content",
          },
        },
      });
    },

    setEditorContentDisabled() {
      this.editor.setOptions({
        editorProps: {
          attributes: {
            class: "tiptap-content--disabled",
          },
        },
      });
    },

    updateCodeBlockLanguage() {
      if (this.editor && this.editor.isActive('codeBlock')) {
        this.editor.commands.updateAttributes('codeBlock', { language: this.codeBlockLanguage });
      }
    },
  },

  data() {
    return {
      editor: null,
      opHeading: null,
      opTextFormat: null,
      opTextAlign: null,
      codeBlockLanguage: "javascript",
    };
  },

  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(value, false);
    },
    errMessage(newValue) {
      if (newValue) {
        this.setEditorContentError();
      } else {
        this.setEditorContentNormal();
      }
    },
    disabled(newValue) {
      if (newValue === false) {
        this.setEditorContentDisabled();
      } else {
        this.setEditorContentNormal();
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.opHeading = this.$refs.opHeading;
      this.opTextFormat = this.$refs.opTextFormat;
      this.opTextAlign = this.$refs.opTextAlign;
    });
    this.editor = new Editor({
      extensions: [
        Document,
        Paragraph,
        Text,
        Heading.configure({
          levels: [1, 2, 3, 4, 5],
        }),
        Blockquote,
        BulletList,
        OrderedList,
        ListItem,
        Image.configure({
          HTMLAttributes: {
            class: "tiptap-image-item",
          },
        }),
        Bold,
        Code,
        Italic,
        Underline,
        Highlight,
        HorizontalRule,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Link.configure({
          openOnClick: true,
          defaultProtocol: "https",
        }),
        Placeholder.configure({
          placeholder: "Write something …",
        }),
        CodeBlockLowlight.configure({
          lowlight,
        }),
      ],
      content: this.modelValue,
      editable: this.$props.disabled,
      editorProps: {
        attributes: {
          class: "tiptap-content",
        },
      },
      onUpdate: () => {
        // HTML
        this.$emit("update:modelValue", this.editor.getHTML());

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style lang="css">
/* Basic editor styles */
.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  ul {
    list-style: outside;
  }

  ol {
    list-style: decimal;
  }

  p {
    color: #d4d4d8;
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    line-height: 1.25;
    font-weight: 600;
    color: #d4d4d8;
  }

  h1 {
    font-size: 2.25rem; /* text-4xl */
  }

  h2 {
    font-size: 1.875rem; /* text-3xl */
  }

  h3 {
    font-size: 1.5rem; /* text-2xl */
  }

  h4 {
    font-size: 1.25rem; /* text-xl */
  }

  h5 {
    font-size: 1.125rem; /* text-lg */
  }

  h6 {
    font-size: 1rem; /* text-base */
  }

  /* Code and preformatted text styles */
  code {
    background-color: rgb(250 250 250 / 0.1);
    border-radius: 0.4rem;
    color: #fff;
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  /* Link styles */
  a {
    color: #f97316;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #fb923c;
    }
  }

  blockquote {
    border-left: 3px solid #fb923c;
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid rgb(250 250 250 / 0.15);
    cursor: pointer;
    margin: 1rem 0;
  }

  mark {
    background-color: #f97316;
    border-radius: 0.4rem;
    box-decoration-break: clone;
    padding: 0.1rem 0.3rem;
    color: #fff;
  }

  p.is-editor-empty:first-child::before {
    color: rgb(250 250 250 / 0.15);
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }

  /* Placeholder (on every new line) */
  .is-empty::before {
    color: rgb(250 250 250 / 0.15);
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }

  pre {
    background: #18181b;
    border-radius: 0.5rem;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }

    /* Code styling */
    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #fbbc88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #b9f18d;
    }

    .hljs-title,
    .hljs-section {
      color: #faf594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70cff8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }
}
</style>
