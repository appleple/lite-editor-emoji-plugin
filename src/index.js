import EmojiPicker from '@appleple/rm-emoji-picker';

const defaultCategories = [
  {
    title: 'People',
    icon: '<i class="lite-editor-emoji-font lite-editor-emoji-font-people" aria-hidden="true"></i>'
  },
  {
    title: 'Nature',
    icon: '<i class="lite-editor-emoji-font lite-editor-emoji-font-nature" aria-hidden="true"></i>'
  },
  {
    title: 'Foods',
    icon: '<i class="lite-editor-emoji-font lite-editor-emoji-font-food" aria-hidden="true"></i>'
  },
  {
    title: 'Activity',
    icon: '<i class="lite-editor-emoji-font lite-editor-emoji-font-activity" aria-hidden="true"></i>'
  },
  {
    title: 'Places',
    icon: '<i class="lite-editor-emoji-font lite-editor-emoji-font-place" aria-hidden="true"></i>'
  },
  {
    title: 'Symbols',
    icon: '<i class="lite-editor-emoji-font lite-editor-emoji-font-symbol" aria-hidden="true"></i>'
  },
  {
    title: 'Flags',
    icon: '<i class="lite-editor-emoji-font lite-editor-emoji-font-flag" aria-hidden="true"></i>'
  }
];

const defaultSheets = {
  apple: '/sheets/sheet_apple_64_indexed_128.png',
  google: '/sheets/sheet_google_64_indexed_128.png',
  twitter: '/sheets/sheet_twitter_64_indexed_128.png',
  emojione: '/sheets/sheet_emojione_64_indexed_128.png'
};

export default class LiteEditorEmojiPicker {
  constructor({
    label = '<i class="lite-editor-emoji-font lite-editor-emoji-font-smile"></i>', group, categories = defaultCategories,
    default_footer_message = 'Please select an emoji from the list above',
    sheets = defaultSheets
  }) {
    this.label = label;
    this.group = group;
    this.categories = categories;
    this.sheets = sheets;
    this.default_footer_message = default_footer_message;
    this.action = 'extra';
    this.firstClicked = false;
  }

  onInit(editor, target) {
    const container = document.querySelector(`[data-id="${editor.id}"]`);
    const editable = container.querySelector('[data-selector="lite-editor"]');
    container.style.position = 'relative';
    this.editable = editable;
    this.editor = editor;
    this.container = container;
    this.target = target;
  }

  onClick() {
    const {
      default_footer_message, categories, container, editable, target, editor, sheets
    } = this;
    if (this.firstClicked) {
      return;
    }
    this.firstClicked = true;
    editor.saveSelection();
    const picker = new EmojiPicker({
      callback: () => {
        editor.onInput();
      },
      default_footer_message,
      categories,
      sheets
    });
    picker.listenOn(target, container, editable);
    editor.restoreSelection();
    picker.editor.selectLastNode();
    picker.picker_open = true;
    picker.openPicker(editor.e);
  }

  onRender(editor, target) {
    if (editor.data.showSource) {
      target.setAttribute('disabled', true);
    } else {
      target.removeAttribute('disabled');
    }
  }
}
