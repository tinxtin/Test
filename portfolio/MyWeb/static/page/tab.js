const tabLayoutEl = document.querySelector('.tab-layout');
const tabListEl = tabLayoutEl.querySelector('.tab-list');
const tabLinkEl = tabListEl.querySelectorAll('.tab-link');
const tabPanelEl = tabLayoutEl.querySelectorAll('.tab-content');
const tabLineEl = document.querySelector('.tab-line');

window.addEventListener('DOMContentLoaded', () => {
    const tabItem = document.querySelector('.tab-active');
    moveLine(tabItem);
})

window.addEventListener('resize', () => {
    const currTab = document.querySelector('.tab-active').parentElement;
    tabLineEl.style.display = 'none';
    moveLine(currTab);
})

tabLayoutEl.addEventListener('click', (e) => {
    const clickTab = e.target.closest('a');
    if (!clickTab) return;
    e.preventDefault();

    switchTab(clickTab);
})


tabListEl.querySelectorAll('li').forEach((listItem) => {
    listItem.setAttribute('role', 'present');
})
tabListEl.setAttribute('role', 'tabListEl');


tabLinkEl.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    if (index === 0) {
        tab.setAttribute('aria-selected','true');
    } else {
        tab.setAttribute('tabindex', '-1');
        tabPanelEl[index].setAttribute('hidden', '');
    }
})

tabLinkEl.forEach(tab => {
    tab.addEventListener('click', (e) => {
        tabLinkEl.forEach(tab=>{tab.classList.remove('tab-active')});
        tab.classList.add('tab-active');

        const currTab = e.target.closest('.tab-item');
        moveLine(currTab);
    })
})


tabPanelEl.forEach((panel) => {
    panel.setAttribute('role', 'tabPanelEl');
    panel.setAttribute('tabindex', '0');
})


function switchTab(newTab) {
    const activePanelId = newTab.getAttribute('href');
    const activeTabPanelEl = tabLayoutEl.querySelector(activePanelId);
    tabPanelEl.forEach((panel) => {
        panel.setAttribute('hidden', true);
    });
    activeTabPanelEl.removeAttribute('hidden');
}

function moveLine(tabItem) {
    const tabLine = document.querySelector('.tab-line');
    tabLine.style.width = parseFloat(window.getComputedStyle(tabItem).getPropertyValue('width')).toFixed(2) + 'px';
    tabLine.style.left = tabItem.offsetLeft + 'px';
    tabLine.style.display = 'block';
}