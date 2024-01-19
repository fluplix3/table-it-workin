import './styles/normalize.css';
import './styles/root.css';
import './styles/App.css'
import { Container, Footer, Header, Loader, Main } from './Components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { rowsPerPageOptions } from './variables';

const App = () => {
  const [data, setData] = useState<string[]>([]);
  const [originalData, setOriginalData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(15);
  const [selectedApi, setSelectedApi] = useState<string>("location");
  const [selectedKey, setSelectedKey] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/${selectedApi}`
        );
        const fetchedData = response.data.results;
        setData(fetchedData);
        setOriginalData(fetchedData);
        setSelectedKey('id');
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [selectedApi]);

  const onRowsPerPageChange = (selectedValue: number) => {
    setRowsPerPage(selectedValue);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  }

  const handleSetKey = (key: string) => {
    setSelectedKey(key);
  };

  //Сортировка по вводу(живой поиск)
  const onSearch = (searchTerm: string) => { 
    if (searchTerm) {
      const filteredData = originalData.filter((item: any) => {
        const itemValue = String(item[selectedKey]).toLowerCase();
        return itemValue.includes(searchTerm.toLowerCase());
      });
      setData(filteredData);
    } else {
      setData(originalData);
    }
  };

  return (
    isLoading ? (
      <Loader />
    ) : (
      <Container>
        <>
          <Header
            onSearch={onSearch}
            handleApiChange={setSelectedApi}
            selectedApi={selectedApi}
            keys={Object.keys(originalData[0] || {})}
            selectedKey={handleSetKey}
          />
          <Main
            data={data}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
          />
          <Footer
            totalItems={data.length}
            rowsPerPageOptions={rowsPerPageOptions}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
            handleChangePage={handleChangePage}
          />
        </>
      </Container>
    )
  );
};

export default App;