import NavigableItemsTable from '@/components/NavigableItemsTable'
import { ProjectListItem } from '@/models/project.model'
import { getProjects } from '@/services/projects.service'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import NoProjectsYet from './NoProjectsYet'

interface ProjectsNavigableTableProps {
  isSortedByRecent: boolean
}

export default function ProjectsNavigableTable({
  isSortedByRecent,
}: ProjectsNavigableTableProps) {
  const router = useRouter()
  const [projects, setProjects] = useState<ProjectListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Cargar proyectos desde el backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await getProjects()
        
        if (response.success && response.projects) {
          setProjects(response.projects)
        } else {
          setError(response.error || 'Error al cargar los proyectos')
        }
      } catch (err) {
        console.error('Error al cargar proyectos:', err)
        setError('Error al cargar los proyectos')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchProjects()
  }, [])
  
  // Interfaz para las filas de datos
  interface DataRow {
    projectName: string
    sectorsNumber: string
    createdAt: string
    _originalId: string // ID original del proyecto para navegación
  }

  // Formatear los datos de proyectos para la tabla y mantener referencia al ID original
  const formatProjects = () => {
    if (!projects.length) return []
    
    return projects.map((project) => ({
      projectName: project.projectName,
      sectorsNumber: project.hasSectors 
        ? `${project.sectorsCount} Sectores` 
        : 'Sin sectores',
      createdAt: formatDate(project.createdAt),
      // Guardar el ID original del proyecto para la navegación
      _originalId: project.id
    }))
  }
  
  // Mostrar fecha como viene del backend
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Fecha no disponible';
    return dateString;
  }
  
  // Obtener las filas de datos formateadas
  const dataRows: DataRow[] = formatProjects()

  // Ordenar las filas por fecha según la preferencia del usuario
  const dataRowsSortedByDate: DataRow[] = [...dataRows].sort((a, b) => {
    if (isSortedByRecent) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }
  })

  // Manejar la navegación a la página de edición del proyecto
  const handleNavigate = (dataRowIndex: number) => {
    if (dataRowIndex >= 0 && dataRowIndex < dataRowsSortedByDate.length) {
      // Usar el ID original almacenado en la fila de datos
      const projectId = dataRowsSortedByDate[dataRowIndex]._originalId
      router.push(`/dashboard/calculator/edit-project/${projectId}`)
    }
  }
  
  // Mostrar indicador de carga mientras se obtienen los datos
  if (isLoading) {
    return (
      <div className="my-8 flex w-full justify-center">
        <p className="body_medium_medium">Cargando proyectos...</p>
      </div>
    )
  }
  
  // Mostrar mensaje de error si falla la carga
  if (error) {
    return (
      <div className="my-8 flex w-full justify-center">
        <p className="body_medium_medium text-red-600">{error}</p>
      </div>
    )
  }
  
  // Mostrar la tabla de proyectos o el mensaje de no hay proyectos
  return dataRowsSortedByDate.length > 0 ? (
    <NavigableItemsTable
      dataRows={dataRowsSortedByDate}
      title="Proyecto"
      handleNavigate={handleNavigate}
    />
  ) : (
    <NoProjectsYet />
  )
}
