# Mountains

> Mountains do not come to you, but you can always go to them.

<style>
.mountain-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
  gap: 20px;
  margin: 32px 0;
}
.mountain-card {
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  box-shadow: 0 1px 8px rgba(0,0,0,0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.mountain-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.12);
}
.mountain-card img {
  width: 100%;
  height: 360px;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.mountain-card:hover img {
  transform: scale(1.03);
}
.mountain-card .info {
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.mountain-card .info .title {
  font-weight: 600;
  font-size: 15px;
  margin: 0;
  color: var(--vp-c-text-1);
}
.mountain-card .info .credit {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin: 0;
}
.mountain-card .info .credit a {
  color: var(--vp-c-text-3);
  text-decoration: none;
  border-bottom: 1px dotted var(--vp-c-border);
}
.mountain-card .info .credit a:hover {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
}

@media (max-width: 520px) {
  .mountain-gallery {
    grid-template-columns: 1fr;
  }
  .mountain-card img {
    height: 260px;
  }
}
</style>

<div class="mountain-gallery">

  <div class="mountain-card">
    <img src="/lens/mountains/iswanto-arif-W_9LJeZykAM.jpg" alt="Distant Peak" loading="lazy" />
    <div class="info">
      <p class="title">Distant Peak</p>
      <p class="credit">Iswanto Arif</p>
    </div>
  </div>

  <div class="mountain-card">
    <img src="/lens/mountains/jonny-james-3no88nSvK88.jpg" alt="Snow Land" loading="lazy" />
    <div class="info">
      <p class="title">Snow Land</p>
      <p class="credit">Jonny James</p>
    </div>
  </div>

  <div class="mountain-card">
    <img src="/lens/mountains/mason-field-uJ6utESznVc.jpg" alt="Layered Peaks" loading="lazy" />
    <div class="info">
      <p class="title">Layered Peaks</p>
      <p class="credit">Mason Field</p>
    </div>
  </div>

  <div class="mountain-card">
    <img src="/lens/mountains/michael-bourgault-aHetdmuNoO4.jpg" alt="Mountain Hue" loading="lazy" />
    <div class="info">
      <p class="title">Mountain Hue</p>
      <p class="credit">Michael Bourgault</p>
    </div>
  </div>

  <div class="mountain-card">
    <img src="/lens/mountains/nathan-anderson-pTgMXg2WrHY.jpg" alt="Solitary" loading="lazy" />
    <div class="info">
      <p class="title">Solitary</p>
      <p class="credit">Nathan Anderson</p>
    </div>
  </div>

  <div class="mountain-card">
    <img src="/lens/mountains/ricardo-gomez angel-b6NL-BSMBqs.jpg" alt="Cloud Mountains" loading="lazy" />
    <div class="info">
      <p class="title">Cloud Mountains</p>
      <p class="credit">Ricardo Gomez Angel</p>
    </div>
  </div>

  <div class="mountain-card">
    <img src="/lens/mountains/sab-qadeer-H4xe6f6YgC0.jpg" alt="Serenity" loading="lazy" />
    <div class="info">
      <p class="title">Serenity</p>
      <p class="credit">Sab Qadeer</p>
    </div>
  </div>

</div>
