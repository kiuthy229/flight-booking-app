interface Review {
  rating: number;
}

const calculateAvgRating = (reviews: Review[]) => {
  const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
  const avgRating =
    totalRating === 0
      ? 0
      : totalRating === 1
      ? totalRating
      : parseFloat((totalRating / reviews.length).toFixed(1));
  return { totalRating, avgRating };
};

export default calculateAvgRating;
