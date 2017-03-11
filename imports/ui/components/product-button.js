import './product-button.html';
import './product-button.less';

Template.ProductButton.onRendered(function onRendered() {
  const icon = this.find('i');
  const text = this.find('span');
  if (this.data.product === 'air') {
    icon.classList.add('fa-plane');
    text.innerText = 'Air';
  } else if (this.data.product === 'ocean') {
    icon.classList.add('fa-ship');
    text.innerText = 'Ocean';
  } else if (this.data.product === 'road') {
    icon.classList.add('fa-truck');
    text.innerText = 'Road';
  }
});