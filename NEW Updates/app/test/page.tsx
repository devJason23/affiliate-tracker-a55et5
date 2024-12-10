import AffiliateTable from '../../components/admin/AffiliateTable'

export default function TestPage() {
  return (
    <div>
      <h1>Test Page</h1>
      <AffiliateTable 
        affiliates={[]}
        onReassign={() => {}}
      />
    </div>
  )
}
