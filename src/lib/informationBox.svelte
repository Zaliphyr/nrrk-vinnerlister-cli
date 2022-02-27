<script>
  export let header = "";
  export let text = "";
  export let variant = "info";
  export let margin = "";

  let style = margin ? `margin: ${margin}; ` : "";

  if (variant === "info") {
    style +=
      "border-color: var(--infoColor); background-color: var(--infoBgColor); ";
  } else if (variant === "success") {
    style +=
      "border-color: var(--successColor); background-color: var(--successBgColor); ";
  } else {
    style +=
      "border-color: var(--errorColor); background-color: var(--errorBgColor); ";
  }
</script>

<div {style}>
  {#if header}
    <p style="font-size: 1.15rem">{header}</p>
  {/if}
  {#if text}
    <p>{text}</p>
  {/if}
</div>

<style>
  div {
    padding: 1rem;
    border: 1px solid black;
  }
</style>
