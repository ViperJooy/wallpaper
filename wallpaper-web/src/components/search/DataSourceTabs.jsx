import { Tabs, Tab, Box } from '@mui/material';

const DATA_SOURCES = [
  { id: 'bird', label: 'Bird', enabled: true },
  { id: 'bing', label: 'Bing', enabled: false },
  { id: '360', label: '360', enabled: false },
];

function DataSourceTabs({ value = 'bird', onChange }) {
  const handleChange = (event, newValue) => {
    const source = DATA_SOURCES.find(s => s.id === newValue);
    if (source && source.enabled && onChange) {
      onChange(newValue);
    }
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        sx={{
          '& .MuiTab-root': {
            minWidth: 100,
          },
        }}
      >
        {DATA_SOURCES.map((source) => (
          <Tab
            key={source.id}
            label={source.label}
            value={source.id}
            disabled={!source.enabled}
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default DataSourceTabs;
