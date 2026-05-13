# My Photography 2026

Capturing moments in life through the lens.

<style>
.photo-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin: 24px 0;
}
.photo-card {
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}
.photo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
.photo-card img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  display: block;
}
.photo-card .info {
  padding: 12px 16px;
}
.photo-card .info .title {
  font-weight: 600;
  font-size: 15px;
  margin: 0 0 4px;
}
.photo-card .info .desc {
  color: var(--vp-c-text-2);
  font-size: 13px;
  margin: 0;
}
</style>

<div class="photo-gallery">

  <div class="photo-card">
    <img src="/lens/felix/felix.jpg" alt="Felix" loading="lazy" />
    <div class="info">
      <p class="title">Self Portrait</p>
      <p class="desc">2026 · Life Snapshot</p>
    </div>
  </div>

  <!-- Add more photos here:
  <div class="photo-card">
    <img src="/lens/your-photo.jpg" alt="Photo description" loading="lazy" />
    <div class="info">
      <p class="title">Photo Title</p>
      <p class="desc">Date · Category</p>
    </div>
  </div>
  -->

</div>
