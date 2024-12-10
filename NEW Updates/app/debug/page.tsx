import AffiliateTable from '../../components/admin/AffiliateTable'

export default function DebugPage() {
  return (
    <div>
      <h1>Debug Page</h1>
      <AffiliateTable 
        affiliates={[]}
        onReassign={() => {}}
      />
    </div>
  )
}
