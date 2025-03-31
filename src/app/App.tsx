import { MainPage } from "@/pages";
import { useStore } from "@/shared/store";
import { Background, Error } from "@/shared/ui";
import { EditForm, Modal, Search } from "@/widgets";
import { createPortal } from "react-dom";

function App() {
  const { editUserOpen, searchOpen, setSearchOpen, setEditUserOpen } = useStore();

  const handleOnSearchClose = () => {
    setSearchOpen(false);
  };

  const handleOnEditUserClose = () => {
    setEditUserOpen(false);
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
