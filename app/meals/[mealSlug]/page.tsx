const MealContent = async ({ params }: { params: { "meal-id": string } }) => {
  console.log(params);
  const parameters = await params;
  return <h1>MealContent - {`${parameters["meal-id"]}`}</h1>;
};

export default MealContent;
