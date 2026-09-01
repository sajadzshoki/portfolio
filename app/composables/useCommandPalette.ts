export function useCommandPalette() {
  const open = useState('cmd-open', () => false)

  function toggle() {
    open.value = !open.value
  }

  function close() {
    open.value = false
  }

  return { open, toggle, close }
}
