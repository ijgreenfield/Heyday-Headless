import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function YotpoReviews() {



    fetch('https://api-cdn.yotpo.com/v1/widget/7DTLUDTEEN8jf5H5TWwLgyTY60lTruCBgm2HJk7s/products/4773568938072/reviews.json')


  return (
    <div>
      <h1></h1>
    </div>
  )
}
