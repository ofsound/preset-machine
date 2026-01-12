export const selectText = (e: PointerEvent) => {
  const clickedInput = e.target as HTMLInputElement
  clickedInput.select()
}
