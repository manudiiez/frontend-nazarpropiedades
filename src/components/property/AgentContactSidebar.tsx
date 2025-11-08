import Image from 'next/image'
import type { Agent } from '@/types'

interface AgentContactSidebarProps {
  agent: Agent
}

const AgentContactSidebar = ({ agent }: AgentContactSidebarProps) => {
  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-28 space-y-6 max-h-[calc(100vh-7rem)] overflow-y-auto">
        <div className="p-6 rounded-xl border border-gray-border bg-surface-light">
          <h3 className="text-xl font-bold mb-4">Contactar Agente</h3>

          {/* Información del Agente */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative size-16 rounded-full overflow-hidden">
              <Image
                src={agent.photo}
                alt={agent.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div>
              <p className="font-bold">{agent.name}</p>
              <p className="text-sm text-text-secondary-light">{agent.role}</p>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center rounded-lg h-12 px-6 bg-accent hover:bg-accent-hover text-white text-base font-bold transition-colors">
              Contactar Agente
            </button>

            <div className="flex gap-4">
              <button className="w-full flex items-center justify-center gap-2 rounded-lg h-12 px-4 bg-white hover:bg-gray-ui text-sm font-bold border border-gray-border transition-colors">
                <span className="material-symbols-outlined">favorite_border</span>
                Guardar
              </button>
              <button className="w-full flex items-center justify-center gap-2 rounded-lg h-12 px-4 bg-white hover:bg-gray-ui text-sm font-bold border border-gray-border transition-colors">
                <span className="material-symbols-outlined">share</span>
                Compartir
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default AgentContactSidebar
