/* Local interactions only: no requests, storage, payments or tracking. */
document.body.classList.add('has-js');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
const subs = [...document.querySelectorAll('.submenu-toggle')];
function closeSubs() { subs.forEach(b => { b.setAttribute('aria-expanded','false'); document.getElementById(b.getAttribute('aria-controls')).hidden = true; }); }
subs.forEach(b => b.addEventListener('click', () => {
  const open = b.getAttribute('aria-expanded') !== 'true'; closeSubs();
  b.setAttribute('aria-expanded', String(open));
  document.getElementById(b.getAttribute('aria-controls')).hidden = !open;
}));
document.addEventListener('click', e => { if (!nav?.contains(e.target)) closeSubs(); });
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const active = subs.find(b => b.getAttribute('aria-expanded') === 'true');
  if (active) { closeSubs(); active.focus(); }
  else if (menu?.getAttribute('aria-expanded') === 'true') { menu.click(); menu.focus(); }
});
document.querySelectorAll('[data-page]').forEach(a => {
  if (a.tagName === 'A' && a.dataset.page === document.body.dataset.page) a.setAttribute('aria-current','page');
});
document.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(x => x.setAttribute('aria-pressed',String(x===b)));
  let count=0;
  document.querySelectorAll('[data-category]').forEach(c => { c.hidden=b.dataset.filter!=='Sve'&&c.dataset.category!==b.dataset.filter; if (!c.hidden) count++; });
  document.querySelector('#filter-empty').hidden=count>0;
  document.querySelector('#filter-count').textContent=`Prikazano priča: ${count}.`;
}));
const amount=document.querySelector('#amount');
document.querySelectorAll('[data-amount]').forEach(b => b.addEventListener('click',()=>{
  amount.value=b.dataset.amount;
  document.querySelectorAll('[data-amount]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
  document.querySelector('#donation-result').textContent='';
}));
amount?.addEventListener('input',()=>{ document.querySelectorAll('[data-amount]').forEach(x=>x.setAttribute('aria-pressed',String(Number(x.dataset.amount)===Number(amount.value)))); document.querySelector('#donation-result').textContent=''; });
document.querySelector('#donation-demo')?.addEventListener('submit',e=>{
  e.preventDefault(); document.querySelector('#donation-result').textContent=`Odabrali ste ${Number(amount.value).toLocaleString('hr-HR',{style:'currency',currency:'EUR'})}. Ovo je samo pregled — uplata nije izvršena.`;
});
document.querySelector('#contact-demo')?.addEventListener('submit',e=>{ e.preventDefault(); document.querySelector('#contact-result').textContent='Obrazac je ispravno popunjen. Ovo je ogledni prikaz; poruka nije poslana niti spremljena.'; });

