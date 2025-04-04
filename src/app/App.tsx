import { MainPage } from "@/pages";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";
import { setEditUserOpen, setSearchOpen } from "@/shared/store/redux-toolkit/modals/modalsSlice";
import { Background, Error } from "@/shared/ui";
import { EditForm, Modal, Search } from "@/widgets";
import { createPortal } from "react-dom";


function App() {
  const dispatch = useAppDispatch()
  const { searchOpen, editUserOpen } = useAppSelector(state => state.modals);

  const handleOnSearchClose = () => {
    dispatch(setSearchOpen(false));
  };

  const handleOnEditUserClose = () => {
    dispatch(setEditUserOpen(false));
  };


  return (
    <>
      <MainPage />
      {createPortal(<Background />, document.body)}
      <Modal onClose={handleOnSearchClose} open={searchOpen}>
        <Search />
      </Modal>
      <Modal onClose={handleOnEditUserClose} open={editUserOpen}>
        <EditForm />
      </Modal>
      <Error />
    </>
  );
}

export default App;
