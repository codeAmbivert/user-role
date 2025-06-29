"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import CloudDownloadIcon from "../../../public/icons/CloudDowloadIcon";
import ArrowDownIcon from "../../../public/icons/ArrowDownIcon";
import MarkCheckIcon from "../../../public/icons/MarkCheckIcon";

interface UserRole {
  id: number;
  name: string;
  type: string;
  date: string;
  status: string;
  users: string[];
  totalUser: number;
}

const UserRoleTable = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<UserRole[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof UserRole | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  // Calculate pagination with sorting
  const sortedData = React.useMemo(() => {
    if (!data || !sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const key = sortConfig.key!;
      let aValue: string | number | Date;
      let bValue: string | number | Date;

      // Handle different data types
      if (key === "date") {
        // Convert date strings to Date objects for proper sorting
        aValue = new Date(a[key] as string);
        bValue = new Date(b[key] as string);
      } else if (key === "totalUser") {
        // Numbers should be compared numerically
        aValue = Number(a[key]);
        bValue = Number(b[key]);
      } else {
        // String comparison (case insensitive)
        aValue = String(a[key]).toLowerCase();
        bValue = String(b[key]).toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const totalItems = sortedData?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData?.slice(startIndex, endIndex) || [];

  // Pagination handlers
  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Checkbox handlers
  const handleSelectAll = () => {
    if (selectedRows.length === currentData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentData.map((role) => role.id));
    }
  };

  const handleSelectRow = (roleId: number) => {
    setSelectedRows((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

  const isAllSelected =
    currentData.length > 0 && selectedRows.length === currentData.length;
  const isIndeterminate =
    selectedRows.length > 0 && selectedRows.length < currentData.length;

  // Sorting handler
  const handleSort = (key: keyof UserRole) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Sort icon component
  const SortIcon = ({ column }: { column: keyof UserRole }) => {
    if (sortConfig.key !== column) {
      return null; // Don't show arrow for inactive columns
    }
    return (
      <ArrowDownIcon
        className={`transform transition-transform ${
          sortConfig.direction === "desc" ? "rotate-180" : ""
        }`}
      />
    );
  };

  const getStatusBadge = (status: string) => {
    if (status === "Active") {
      return (
        <span className="inline-flex gap-1 items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
          <MarkCheckIcon />
          Active
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
          In Active
        </span>
      );
    }
  };

  const renderUserAvatars = (users: string[], totalUser: number) => {
    const displayUsers = users.slice(0, 5);
    const remainingCount =
      totalUser > 0
        ? totalUser - displayUsers.length
        : Math.max(0, users.length - displayUsers.length);

    return (
      <div className="flex items-center -space-x-2">
        {displayUsers.map((userUrl, index) => (
          <div key={index} className="relative">
            <Image
              src={userUrl}
              alt={`User ${index + 1}`}
              width={32}
              height={32}
              className="min-w-8 w-8 min-h-8 h-8 rounded-full border-2 border-white object-cover"
            />
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="z-5 w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
            +{remainingCount}
          </div>
        )}
      </div>
    );
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://gamma-api.vercel.app/api/roles"
      );
      setData(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">User Roles</h2>
        <button className="inline-flex gap-2 items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <CloudDownloadIcon />
          Download all
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto hide-scrollbar border border-gray-200 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50 whitespace-nowrap">
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex gap-1 items-center hover:text-gray-700 transition-colors"
                  onClick={() => handleSort("name")}
                >
                  Name
                  <SortIcon column="name" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex gap-1 items-center hover:text-gray-700 transition-colors"
                  onClick={() => handleSort("type")}
                >
                  Type
                  <SortIcon column="type" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex gap-1 items-center hover:text-gray-700 transition-colors"
                  onClick={() => handleSort("date")}
                >
                  Date created
                  <SortIcon column="date" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex gap-1 items-center hover:text-gray-700 transition-colors"
                  onClick={() => handleSort("status")}
                >
                  Status
                  <SortIcon column="status" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex gap-1 items-center hover:text-gray-700 transition-colors"
                  onClick={() => handleSort("totalUser")}
                >
                  Role users
                  <SortIcon column="totalUser" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData && currentData.length > 0 ? (
              currentData.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(role.id)}
                      onChange={() => handleSelectRow(role.id)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {role.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {role.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {role.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getStatusBadge(role.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {renderUserAvatars(role.users, role.totalUser)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      <CloudDownloadIcon width={20} height={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  {loading ? "Loading..." : "No roles found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data && data.length > 0 && (
        <div className="flex flex-wrap gap-3 items-center justify-between py-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} - {Math.min(endIndex, totalItems)} of{" "}
              {totalItems}
            </div>
            {selectedRows.length > 0 && (
              <div className="text-sm text-green-600 font-medium">
                {selectedRows.length} selected
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
              {currentPage}
            </div>

            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>

            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="ml-4 border border-gray-300 rounded px-2 py-1 text-sm bg-white"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRoleTable;
