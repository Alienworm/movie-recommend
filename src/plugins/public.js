exports.install = function (Vue) {
  Vue.prototype.goToPage = (index) => {
    let itemList = document.getElementsByClassName('side-bar-container-item');
    for (let i = 0; i < itemList.length; i++)
      itemList[i].classList.remove('side-bar-container-item-seleted');
    itemList[index].classList.add('side-bar-container-item-seleted');
  };
};
