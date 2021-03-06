// lib
import React from 'react'

// src
import EnhancedTable from '../EnhancedTable'
import CreateGrades from '../CreateGrades'
import EditGrades from '../EditGrades'
import LoadingView from '../LoadingView'

const GradesSectionsInner = ({
  error,
  isLoading,
  rows,
  data,
  onDeleteGrade,
  onCreateGrade,
  onUpdateGrade,
  createDialog,
  editDialog,
  editId,
  handleClose,
  onDataExport,
  importData,
}) => (
  <Choose>
    <When condition={!error && !isLoading}>
      <div>
        <EnhancedTable
          tableName={'Grades & Sections'}
          sortKey="grade_name"
          rows={rows}
          data={data}
          error={error}
          onDataImport={importData}
          onDataExport={onDataExport}
          handleDeleteRow={onDeleteGrade}
          handleCreateRow={onCreateGrade}
          handleEditRow={onUpdateGrade}
        />
        <EditGrades id={editId} open={editDialog} onClose={handleClose} />
        <CreateGrades open={createDialog} onClose={handleClose} />
      </div>
    </When>
    <Otherwise>
      <LoadingView />
    </Otherwise>
  </Choose>
)
export default GradesSectionsInner
