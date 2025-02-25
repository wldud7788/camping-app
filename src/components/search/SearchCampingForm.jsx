import PropTypes from "prop-types";

export const SearchCampingForm = ({ searchText, setSearchText }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button>검색</button>
    </form>
  );
};
SearchCampingForm.propTypes = {
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
};
