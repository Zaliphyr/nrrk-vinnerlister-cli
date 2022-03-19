<script>
  // Options can be either strings, or objects with fields {value, text}
  export let options = [];
  export let margin = null;
  export let width = null;
  export let value;
  export let onChange;
  export let title;
  export let placeholder = "";

  let shouldShowDropdown = false;
  let isFocused = false;
  let searchValue = "";
  let filteredOptions = [...options];
  let highlightedOptionIndex = null;

  let containerElement;
  let inputElement;

  let style = "";
  if (margin) {
    style += `margin: ${margin}; `;
  }
  if (width) {
    style += `width: ${width}; `;
  }

  $: options, (filteredOptions = [...options]);
  $: searchValue, onSearchChange();
  $: value, onExternalValueChange();

  function onSearchFocus() {
    shouldShowDropdown = true;
    isFocused = true;

    if (value) {
      onChange(null);
      searchValue = "";
    }
  }

  function onComponentBlur() {
    if (!searchValue) {
      isFocused = false;
      shouldShowDropdown = false;
    }
  }

  function onSearchBlur() {
    if (!searchValue) {
      setTimeout(() => {
        isFocused = false;
        shouldShowDropdown = false;
      }, 100);
    }
  }

  function onSearchChange() {
    if (searchValue === value) {
      return;
    }

    highlightedOptionIndex = null;

    if (!searchValue && !isFocused) {
      shouldShowDropdown = false;
    }

    filteredOptions = options
      .filter((opt) =>
        opt.text.toLowerCase().includes(searchValue.toLowerCase())
      )
      .slice(0, 10);
  }

  function onExternalValueChange() {
    if (!value) {
      return;
    }

    searchValue = value.text;
  }

  function onOptionSelected(option) {
    shouldShowDropdown = false;
    onChange(option);
    containerElement.blur();
    inputElement.blur();
  }

  function onInputKeyUp(keyEvent) {
    if (!filteredOptions.length) {
      return;
    }

    if (keyEvent.key === "Enter") {
      onOptionSelected(filteredOptions[0]);
    }

    if (keyEvent.key === "ArrowUp" || keyEvent.key === "ArrowDown") {
      let isDown = keyEvent.key === "ArrowDown";

      if (highlightedOptionIndex === null) {
        highlightedOptionIndex = isDown ? 0 : filteredOptions.length - 1;
      } else if (highlightedOptionIndex === 0 && !isDown) {
        highlightedOptionIndex = filteredOptions.length - 1;
      } else {
        highlightedOptionIndex =
          (highlightedOptionIndex + (isDown ? 1 : -1)) % filteredOptions.length;
      }
    }
  }
</script>

<div
  class="dropdown"
  on:blur={onComponentBlur}
  {style}
  tabindex={0}
  bind:this={containerElement}
>
  <p class="title">
    {title}
  </p>

  <div id="myDropdown">
    <input
      bind:this={inputElement}
      type="text"
      {placeholder}
      bind:value={searchValue}
      on:focus={onSearchFocus}
      required
      on:blur={onSearchBlur}
      on:keyup={onInputKeyUp}
    />

    {#if shouldShowDropdown && filteredOptions.length}
      <div class="dropdown-content" style={`width: ${width}`}>
        {#each filteredOptions as opt, i}
          <p
            class={`option ${
              highlightedOptionIndex === i ? "highlighted-option" : ""
            }`}
            on:click={() => onOptionSelected(opt)}
          >
            {opt.text}
          </p>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .title {
    margin-left: 6px;
    font-weight: 300;
  }

  input {
    box-sizing: border-box;
    font-size: 16px;
    padding: 4px 6px 6px 6px;
    border: none;
    border-bottom: 1px solid #ddd;
    width: 100%;
    border-radius: 0;
    background-color: transparent;

    border-width: 0;
    border-style: hidden;
    border-image: linear-gradient(
        to right,
        var(--maincolorFaded),
        var(--maincolorFaded)
      )
      1;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    transition: border-image 150ms;
  }

  input:focus,
  input:valid {
    border-image: linear-gradient(to right, var(--maincolor), var(--maincolor))
      1;
    outline: none;
  }

  .dropdown-content {
    position: absolute;
    box-shadow: rgba(60, 64, 67, 0.2) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.1) 0px 2px 6px 2px;
    min-width: 230px;
    overflow-y: auto;
    border: 1px solid #ddd;
    z-index: 2;
    background-color: white;
  }

  .option {
    color: black;
    padding: 0.5rem;
    text-decoration: none;
    display: block;
  }

  .option:hover {
    background-color: #ddd;
    cursor: pointer;
  }

  .highlighted-option {
    background-color: var(--maincolorFaded);
  }
</style>
