import { useEffect, useState } from 'react'


export default function YotpoReviews() {
  const [showReviews, setShowReviews] = useState();

  let reviews;

  function getReviews() {
    const url = 'https://api-cdn.yotpo.com/v1/widget/7DTLUDTEEN8jf5H5TWwLgyTY60lTruCBgm2HJk7s/products/4773568938072/reviews.json'
    fetch(url)
      .then(response => response.json())
      .then(data => {
        data.response.reviews.map(item => (
            <p>{item.content}</p>
          )
        )
      })

    //return
  }

  useEffect(() => {
    getReviews()
  })

  return (
    <div>
      {showReviews}
    </div>
  )
}
