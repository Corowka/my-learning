"use strict"

function choosePage(page_num) {
    const pages = document.querySelectorAll('.page');
    pages.forEach((item, index) => {
        if (index + 1 !== page_num) {
            item.style.display = 'none';
        }
        else {
            item.style.display = 'block';
        }
    });
}

const pageNavBnt1 = document.getElementById('page-nav-btn-1');
const pageNavBnt2 = document.getElementById('page-nav-btn-2');
const pageNavBnt3 = document.getElementById('page-nav-btn-3');


pageNavBnt1.addEventListener('click', () => choosePage(1));
pageNavBnt2.addEventListener('click', () => choosePage(2));
pageNavBnt3.addEventListener('click', () => choosePage(3));
