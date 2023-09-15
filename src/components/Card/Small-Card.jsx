function SmallCard() {
  return (
    <>
      <div className="card w-full bg-base-100 shadow-xl image-full">
        <figure>
          <img
            src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <p>Popularity</p>
          <p>Release date</p>
        </div>
      </div>
    </>
  )
}
export default SmallCard
