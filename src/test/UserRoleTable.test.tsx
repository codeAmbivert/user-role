import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import UserRoleTable from '@/components/shared/UserRoleTable'

// Mock axios
vi.mocked(axios.get)

const mockUserRoles = [
  {
    id: 1,
    name: 'Admin',
    type: 'System',
    date: '2024-01-15',
    status: 'Active',
    users: ['/images/user1.jpg', '/images/user2.jpg'],
    totalUser: 5
  },
  {
    id: 2,
    name: 'Editor',
    type: 'Custom',
    date: '2024-01-10',
    status: 'In Active',
    users: ['/images/user3.jpg'],
    totalUser: 3
  },
  {
    id: 3,
    name: 'Viewer',
    type: 'System',
    date: '2024-01-20',
    status: 'Active',
    users: ['/images/user4.jpg', '/images/user5.jpg', '/images/user6.jpg'],
    totalUser: 8
  }
]

describe('UserRoleTable', () => {
  beforeEach(() => {
    vi.mocked(axios.get).mockResolvedValue({ data: mockUserRoles })
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('Rendering', () => {
    it('renders loading state initially', () => {
      render(<UserRoleTable />)
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('renders table with data after loading', async () => {
      render(<UserRoleTable />)
      
      await waitFor(() => {
        expect(screen.getByText('Admin')).toBeInTheDocument()
        expect(screen.getByText('Editor')).toBeInTheDocument()
        expect(screen.getByText('Viewer')).toBeInTheDocument()
      })
    })

    it('renders table headers correctly', async () => {
      render(<UserRoleTable />)
      
      await waitFor(() => {
        expect(screen.getByText('Name')).toBeInTheDocument()
        expect(screen.getByText('Type')).toBeInTheDocument()
        expect(screen.getByText('Date created')).toBeInTheDocument()
        expect(screen.getByText('Status')).toBeInTheDocument()
        expect(screen.getByText('Role users')).toBeInTheDocument()
      })
    })

    it('renders download button', () => {
      render(<UserRoleTable />)
      expect(screen.getByText('Download all')).toBeInTheDocument()
    })
  })

  describe('API Integration', () => {
    it('calls API on mount', () => {
      render(<UserRoleTable />)
      expect(axios.get).toHaveBeenCalledWith('https://gamma-api.vercel.app/api/roles')
    })

    it('handles API error gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      vi.mocked(axios.get).mockRejectedValue(new Error('API Error'))
      
      render(<UserRoleTable />)
      
      await waitFor(() => {
        expect(screen.getByText('No roles found.')).toBeInTheDocument()
      })
      
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })

  describe('Pagination', () => {
    it('displays correct pagination info', async () => {
      render(<UserRoleTable />)
      
      await waitFor(() => {
        expect(screen.getByText('Showing 1 - 3 of 3')).toBeInTheDocument()
      })
    })

    it('handles items per page change', async () => {
      const user = userEvent.setup()
      render(<UserRoleTable />)
      
      await waitFor(() => {
        expect(screen.getByDisplayValue('5')).toBeInTheDocument()
      })
      
      const select = screen.getByDisplayValue('5')
      await user.selectOptions(select, '10')
      
      expect(screen.getByDisplayValue('10')).toBeInTheDocument()
    })

    it('handles pagination navigation', async () => {
      const user = userEvent.setup()
      const manyRoles = Array.from({ length: 15 }, (_, i) => ({
        ...mockUserRoles[0],
        id: i + 1,
        name: `Role ${i + 1}`
      }))
      
      vi.mocked(axios.get).mockResolvedValue({ data: manyRoles })
      
      render(<UserRoleTable />)
      
      await waitFor(() => {
        expect(screen.getByText('Role 1')).toBeInTheDocument()
      })
      
      const nextButton = screen.getByText('Next')
      await user.click(nextButton)
      
      expect(screen.getByText('Role 6')).toBeInTheDocument()
      
      const prevButton = screen.getByText('Previous')
      await user.click(prevButton)
      
      expect(screen.getByText('Role 1')).toBeInTheDocument()
    })

    it('disables pagination buttons appropriately', async () => {
      render(<UserRoleTable />)
      
      await waitFor(() => {
        const prevButton = screen.getByText('Previous')
        const nextButton = screen.getByText('Next')
        
        expect(prevButton).toHaveAttribute('disabled')
        expect(nextButton).toHaveAttribute('disabled')
      })
    })
  })

  describe('Row Selection', () => {
    it('handles individual row selection', async () => {
      const user = userEvent.setup()
      render(<UserRoleTable />)
      
      await waitFor(() => {
        expect(screen.getByText('Admin')).toBeInTheDocument()
      })
      
      const checkboxes = screen.getAllByRole('checkbox')
      const firstRowCheckbox = checkboxes[1] // Skip header checkbox
      
      await user.click(firstRowCheckbox)
      
      expect(screen.getByText('1 selected')).toBeInTheDocument()
    })

    it('handles select all functionality', async () => {
      const user = userEvent.setup()
      render(<UserRoleTable />)
      
      await waitFor(() => {
        expect(screen.getByText('Admin')).toBeInTheDocument()
      })
      
      const selectAllCheckbox = screen.getAllByRole('checkbox')[0]
      await user.click(selectAllCheckbox)
      
      expect(screen.getByText('3 selected')).toBeInTheDocument()
    })

    it('shows indeterminate state when some rows selected', async () => {
      const user = userEvent.setup()
      render(<UserRoleTable />)
      
      await waitFor(() => {
        expect(screen.getByText('Admin')).toBeInTheDocument()
      })
      
      const checkboxes = screen.getAllByRole('checkbox')
      const firstRowCheckbox = checkboxes[1]
      
      await user.click(firstRowCheckbox)
      
      const selectAllCheckbox = checkboxes[0] as HTMLInputElement
      expect(selectAllCheckbox.indeterminate).toBe(true)
    })
  })

  describe('Sorting', () => {
    it('sorts by name column', async () => {
      const user = userEvent.setup()
      render(<UserRoleTable />)
      
      await waitFor(() => {
        expect(screen.getByText('Admin')).toBeInTheDocument()
      })
      
      const nameHeader = screen.getByText('Name').closest('button')!
      await user.click(nameHeader)
      
      // After sorting ascending, Admin should still be first
      const rows = screen.getAllByRole('row')
      expect(rows[1]).toHaveTextContent('Admin')
    })

    it('toggles sort direction on multiple clicks', async () => {
      const user = userEvent.setup()
      render(<UserRoleTable />)
      
      await waitFor(() => {
        expect(screen.getByText('Admin')).toBeInTheDocument()
      })
      
      const nameHeader = screen.getByText('Name').closest('button')!
      
      // Click once for ascending
      await user.click(nameHeader)
      
      // Click again for descending
      await user.click(nameHeader)
      
      // Should now show Viewer first (alphabetically last)
      const rows = screen.getAllByRole('row')
      expect(rows[1]).toHaveTextContent('Viewer')
    })

    it('resets to first page when sorting', async () => {
      const user = userEvent.setup()
      const manyRoles = Array.from({ length: 15 }, (_, i) => ({
        ...mockUserRoles[0],
        id: i + 1,
        name: `Role ${String.fromCharCode(90 - i)}` // Z, Y, X, etc.
      }))
      
      vi.mocked(axios.get).mockResolvedValue({ data: manyRoles })
      
      render(<UserRoleTable />)
      
      await waitFor(() => {
        expect(screen.getByText('Role Z')).toBeInTheDocument()
      })
      
      // Go to page 2
      const nextButton = screen.getByText('Next')
      await user.click(nextButton)
      
      // Now sort by name
      const nameHeader = screen.getByText('Name').closest('button')!
      await user.click(nameHeader)
      
      // Should be back on page 1 with sorted results
      expect(screen.getByText('1')).toBeInTheDocument() // Current page indicator
    })
  })

  describe('Status Badge', () => {
    it('renders active status correctly', async () => {
      render(<UserRoleTable />)
      
      await waitFor(() => {
        const activeStatus = screen.getAllByText('Active')[0]
        expect(activeStatus).toBeInTheDocument()
        expect(activeStatus.closest('span')).toHaveClass('bg-green-50', 'text-green-700')
      })
    })

    it('renders inactive status correctly', async () => {
      render(<UserRoleTable />)
      
      await waitFor(() => {
        const inactiveStatus = screen.getByText('In Active')
        expect(inactiveStatus).toBeInTheDocument()
        expect(inactiveStatus.closest('span')).toHaveClass('bg-orange-50', 'text-orange-700')
      })
    })
  })

  describe('User Avatars', () => {
    it('renders user avatars correctly', async () => {
      render(<UserRoleTable />)
      
      await waitFor(() => {
        const images = screen.getAllByRole('img')
        expect(images.length).toBeGreaterThan(0)
      })
    })

    it('shows remaining user count when there are more than 5 users', async () => {
      const roleWithManyUsers = {
        ...mockUserRoles[0],
        users: Array.from({ length: 7 }, (_, i) => `/images/user${i + 1}.jpg`),
        totalUser: 10
      }
      
      vi.mocked(axios.get).mockResolvedValue({ data: [roleWithManyUsers] })
      
      render(<UserRoleTable />)
      
      await waitFor(() => {
        expect(screen.getByText('+5')).toBeInTheDocument()
      })
    })
  })

  describe('Empty State', () => {
    it('shows no roles message when data is empty', async () => {
      vi.mocked(axios.get).mockResolvedValue({ data: [] })
      
      render(<UserRoleTable />)
      
      await waitFor(() => {
        expect(screen.getByText('No roles found.')).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper table structure', async () => {
      render(<UserRoleTable />)
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument()
        expect(screen.getAllByRole('columnheader')).toHaveLength(7)
      })
    })

    it('has accessible checkboxes', async () => {
      render(<UserRoleTable />)
      
      await waitFor(() => {
        const checkboxes = screen.getAllByRole('checkbox')
        expect(checkboxes.length).toBeGreaterThan(0)
        checkboxes.forEach(checkbox => {
          expect(checkbox).toHaveAttribute('type', 'checkbox')
        })
      })
    })
  })

  describe('Responsive Design', () => {
    it('has overflow handling for table', async () => {
      render(<UserRoleTable />)
      
      await waitFor(() => {
        const tableContainer = document.querySelector('.overflow-x-auto')
        expect(tableContainer).toBeInTheDocument()
      })
    })
  })
})
