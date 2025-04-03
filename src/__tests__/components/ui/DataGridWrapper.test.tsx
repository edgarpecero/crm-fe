// __tests__/components/DataGridWrapper.test.tsx
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DataGridWrapper from '@/components/ui/DataGridWrapper/DataGridWrapper';
import '@testing-library/jest-dom';
import { BaseEntity } from '@/types/BaseEntity';

// Mock the custom hooks
jest.mock('@/components/ui/DataGridWrapper/hooks/useDataGridRows', () => ({
  __esModule: true,
  default: jest.fn((props) => props.rows),
}));

jest.mock('@/components/ui/DataGridWrapper/hooks/useDataGridCols', () => ({
  __esModule: true,
  default: jest.fn((props) => props.cols),
}));

jest.mock('@/components/ui/IconButtons/NoResults/NoResults', () => {
  return function MockNoResults() {
    return <div data-testid='no-results'>No Results</div>;
  };
});

interface Test extends BaseEntity {
  userName: string;
}

describe('DataGridWrapper', () => {
  const mockColumns = [
    { field: 'id', headerName: 'INE', width: 200 },
    { field: 'number', headerName: 'Order Number', width: 180 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
    { field: 'lastModifiedAt', headerName: 'Last Modified At', width: 200 },
    { field: 'lastModifiedBy', headerName: 'Last Modified By', width: 150 },
    { field: 'userName', headerName: 'User Name', width: 150 },
  ];

  const mockRows: Test[] = [
    {
      id: '123abc',
      number: 'ORD-20240327-001',
      status: 'Pending',
      createdAt: new Date().toISOString(),
      lastModifiedAt: new Date().toISOString(),
      lastModifiedBy: 'AdminUser',
      userName: 'AdminUser',
    },
    {
      id: '456def',
      number: 'ORD-20240327-002',
      status: 'Shipped',
      createdAt: new Date().toISOString(),
      lastModifiedAt: new Date().toISOString(),
      lastModifiedBy: 'ManagerUser',
      userName: 'ManagerUser',
    },
    {
      id: '789ghi',
      number: 'ORD-20240327-003',
      status: 'Delivered',
      createdAt: new Date().toISOString(),
      lastModifiedAt: new Date().toISOString(),
      lastModifiedBy: 'System',
      userName: 'ManagerUser',
    },
  ];

  const renderWithTheme = (component) => {
    return render(<ThemeProvider theme={createTheme()}>{component}</ThemeProvider>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderWithTheme(<DataGridWrapper rows={mockRows} columns={mockColumns} />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('displays data rows correctly', () => {
    renderWithTheme(<DataGridWrapper rows={mockRows} columns={mockColumns} />);
    expect(screen.getByText('ORD-20240327-003')).toBeInTheDocument();
  });

  it('shows NoResults overlay when rows are empty', () => {
    renderWithTheme(<DataGridWrapper rows={[]} columns={mockColumns} />);
    expect(screen.getByTestId('no-results')).toBeInTheDocument();
  });
});
