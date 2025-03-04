const BitcoinYearlyChart = () => {
  const [data, setData] = useState(mockedData);
  const [error, setError] = useState(null);

  useEffect(() => {
    // The API fetching section is commented out since we're using mocked data.
    // let isMounted = true;
    // const fetchYearlyData = async () => {
    //   try {
    //     const response = await axios.get(`${API_URL}/api/bitcoin-yearly`);
    //     if (response.data.success && isMounted) {
    //       setData(response.data.data);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching Bitcoin yearly data:", error);
    //     if (isMounted) setError("Failed to fetch Bitcoin data.");
    //   }
    // };
    // fetchYearlyData();
    // return () => {
    //   isMounted = false;
    // };
  }, []); // Commenting out the useEffect hook for the API call

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <h5>22Bitcoin Yearly Chart</h5>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
