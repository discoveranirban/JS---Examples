// polyfill for getElementsByClassName
document.findByClass = function (requiredClass) {
  const root = this.body;

  function search(elementNode) {
    let res = [];

    if (elementNode.classList.contains(requiredClass)) {
      res.push(elementNode);
    }

    for (const ele of elementNode.children) {
      res = res.concat(search(ele));
    }

    return res;
  }

  return search(root);
};

const body = document.body;
const boxes = document.findByClass("box");

function reset() {
  body.classList.remove("active");
  boxes.forEach((box) => {
    box.classList.remove("active");
  });
  setActiveClass.reset();
}

const setActiveClass = (function () {
  let elementOrder = [];

  return {
    handler: function (e) {
      elementOrder.push(this);
      setTimeout(() => {
        this.classList.add("active");
      }, 500 * elementOrder.length);
    },
    reset: function () {
      elementOrder = [];
    },
  };
})();

body.addEventListener("click", setActiveClass.handler);

boxes.forEach((box) => {
  box.addEventListener("click", setActiveClass.handler);
});
