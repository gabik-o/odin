/**
 * Native images for the home “Featured Works” grid.
 * Framer’s ProjectCard + unframer Image use viewport math that breaks in our responsive layout
 * (images stayed lazy until overscroll / never on mobile). This card matches the same layout
 * without that loading pipeline.
 */
export default function FeaturedWorkCard({
  title,
  mainImage,
  hoverImage,
  fetchPriorityHigh = false,
}) {
  return (
    <article className="featured-work-card">
      <div className="featured-work-card__media">
        <img
          className="featured-work-card__img featured-work-card__img--base"
          src={mainImage}
          alt={title}
          loading="eager"
          decoding="async"
          fetchPriority={fetchPriorityHigh ? 'high' : 'auto'}
          draggable={false}
        />
        <img
          className="featured-work-card__img featured-work-card__img--hover"
          src={hoverImage}
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="low"
          draggable={false}
        />
      </div>
      <h4 className="text-h4 featured-work-card__title">{title}</h4>
    </article>
  )
}
