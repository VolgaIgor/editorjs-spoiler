import './index.css';

import { IconHidden } from '@codexteam/icons';

/**
 * Spoiler Block Tool for the Editor.js
 */
export default class Spoiler {
  /**
   * Describe an icon and title here
   * Required if Tools should be added to the Toolbox
   * @link https://editorjs.io/tools-api#toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: IconHidden,
      title: 'Spoiler',
    };
  }

  /**
   * This flag tells core that current tool supports the read-only mode
   * @link https://editorjs.io/tools-api#isreadonlysupported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }

  /**
   * With this option, Editor.js won't handle Enter keydowns
   * @link https://editorjs.io/tools-api#enablelinebreaks
   *
   * @returns {boolean}
   */
  static get enableLineBreaks() {
    return true;
  }


  /**
   * Class constructor
   * @param data - Previously saved data
   * @param api - Editor.js API
   * @param config - user config for Tool
   * @param readOnly - user config for Tool
   * @param block - current block API object
   * 
   * @link https://editorjs.io/tools-api#class-constructor
   */
  constructor({ data, api, config, readOnly, block }) {
    this.api = api;
    this.config = {
      editorLibrary: config.editorLibrary,
      editorTools: config.editorTools || {},
      editorTunes: config.editorTunes || {},
    };
    this.readOnly = readOnly;
    this.block = block;

    this._data = {
      caption: '',
      content: []
    };
    this.data = data;

    this._rootNode = null;
    this._captionInput = null;
    this._editor = null;
  }

  /**
   * CSS classes
   *
   * @returns {object}
   */
  get CSS() {
    return {
      root: 'cdx-spoiler',
      wrapper: 'cdx-spoiler_wrapper',
      header: 'cdx-spoiler_header',
      icon: 'cdx-spoiler_icon',
      input: 'cdx-spoiler_input',
      editor: 'cdx-spoiler_editor',
    };
  };

  /**
   * Return Tool data
   *
   * @returns {object}
   */
  get data() {
    return this._data;
  }

  /**
   * Stores all Tool's data
   *
   * @param {object} data
   */
  set data(data) {
    this._data.caption = data.caption || '';
    if (this._captionInput) {
      this._captionInput.value = this.data.caption;
    }

    this._data.content = data.content || [];
    if (this._editor) {
      this._editor.blocks.render({
        blocks: this.data.content || []
      });
    }
  }

  /**
   * Creates UI of a Block
   * Required
   * @link https://editorjs.io/tools-api#render
   * 
   * @returns {HTMLElement}
   */
  render() {
    const rootNode = document.createElement('div');
    rootNode.classList.add(this.CSS.root, this.api.styles.block);

    const wrapper = document.createElement('div');
    wrapper.classList.add(this.CSS.wrapper);

    const header = document.createElement('div');
    header.classList.add(this.CSS.header);

    const icon = document.createElement('div');
    icon.classList.add(this.CSS.icon);
    icon.innerHTML = IconHidden;

    const input = document.createElement('input');
    input.classList.add(this.CSS.input, this.api.styles.input);
    input.value = this.data.caption;
    input.placeholder = this.api.i18n.t('Hidden text');
    this._captionInput = input;

    header.appendChild(icon);
    header.appendChild(input);

    const editorNode = document.createElement('div');
    editorNode.classList.add(this.CSS.editor);

    wrapper.appendChild(header);
    wrapper.appendChild(editorNode);

    rootNode.appendChild(wrapper);
    this._rootNode = rootNode;

    const initialData = {
      blocks: this.data.content || []
    };
    this._editor = new this.config.editorLibrary({
      holder: editorNode,
      data: initialData,
      tools: this.config.editorTools,
      tunes: this.config.editorTunes,
      minHeight: 150,
      readOnly: this.readOnly,
      onChange: () => {
        this.block.dispatchChange()
      }
    });

    return rootNode;
  }

  /**
   * Extracts Block data from the UI
   * Required
   * @link https://editorjs.io/tools-api#save
   * 
   * @returns {object} saved data
   */
  async save() {
    const saveData = await this._editor.save();

    return {
      caption: this._captionInput.value,
      content: saveData?.blocks || []
    };
  }
}
