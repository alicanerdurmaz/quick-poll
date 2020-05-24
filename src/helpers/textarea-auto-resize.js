function resize({ target }) {
  target.style.height = '1rem'
  target.style.height = +target.scrollHeight + 'px'
}

export function textAreaResize(el) {
  resize({ target: el })
  el.style.overflow = 'hidden'
  el.addEventListener('input', resize)

  return {
    destroy: () => el.removeEventListener('input', resize),
  }
}
