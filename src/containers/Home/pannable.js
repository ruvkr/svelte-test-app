/** @param {HTMLElement} node */
export function pannable(node) {
  let origin = null;
  let difference = null;
  let panning = false;

  /** @param {MouseEvent | TouchEvent} event */
  function startfunc(event) {
    const touch = _getOrigin(event);
    const { x, y } = node.getBoundingClientRect();
    origin = touch;
    difference = { dx: touch.x - x, dy: touch.y - y };

    window.addEventListener('mousemove', movefunc);
    window.addEventListener('touchmove', movefunc, { passive: false });
    window.addEventListener('touchend', endfunc);
    window.addEventListener('mouseup', endfunc);
    document.addEventListener('mouseleave', endfunc);
  }

  /** @param {MouseEvent | TouchEvent} event */
  function movefunc(event) {
    if (event.cancelable) event.preventDefault();
    if (!panning) panning = true;
    const touch = _getOrigin(event);
    node.dispatchEvent(
      new CustomEvent('panmove', {
        detail: {
          x: touch.x,
          y: touch.y,
          ox: origin.x,
          oy: origin.y,
          dx: difference.dx,
          dy: difference.dy,
        },
      })
    );
  }

  /** @param {MouseEvent | TouchEvent} event */
  function endfunc(event) {
    if (panning) {
      const touch = _getOrigin(event);
      node.dispatchEvent(
        new CustomEvent('panend', {
          detail: {
            x: touch.x,
            y: touch.y,
            ox: origin.x,
            oy: origin.y,
            dx: difference.dx,
            dy: difference.dy,
          },
        })
      );
    }

    origin = null;
    difference = null;
    panning = false;

    window.removeEventListener('mousemove', movefunc);
    window.removeEventListener('touchmove', movefunc, { passive: false });
    window.removeEventListener('touchend', endfunc);
    window.removeEventListener('mouseup', endfunc);
    document.removeEventListener('mouseleave', endfunc);
  }

  node.addEventListener('mousedown', startfunc);
  node.addEventListener('touchstart', startfunc);

  return {
    destroy: () => {
      node.removeEventListener('mousedown', startfunc);
      node.removeEventListener('touchstart', startfunc);
    },
  };
}

/** @typedef {{ x: number; y: number; time: number }} Touch */

/**
 * @param {MouseEvent | TouchEvent} event
 * @returns {Touch}
 */
const _getOrigin = event => ({
  x: event.pageX !== undefined ? event.pageX : event.changedTouches[0].pageX,
  y: event.pageY !== undefined ? event.pageY : event.changedTouches[0].pageY,
  time: event.timeStamp,
});
