function useNavigation(currentPage, numberOfPages, searchParams, setSearchParams) {
  const handleBack = () => {
    if (currentPage > 1) {
      searchParams.set("page", currentPage - 1);
      setSearchParams(searchParams);
    }
  };

  const handleForward = () => {
    if (currentPage < numberOfPages) {
      searchParams.set("page", currentPage + 1);
      setSearchParams(searchParams);
    }
  };

  const handlePerPageChange = (event) => {
    const perPage = event.target.value;
    searchParams.set("page", 1);
    searchParams.set("per_page", perPage);
    setSearchParams(searchParams);
  };

  return { handleBack, handleForward, handlePerPageChange };
}

export default useNavigation;
