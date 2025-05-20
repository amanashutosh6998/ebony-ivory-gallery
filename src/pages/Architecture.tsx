import MiroEmbed from '@/components/MiroEmbed';
import AwsDataFlowChart from '@/components/AwsDataFlowChart';

const ArchitecturePage = () => {
  return (
    <div className="space-y-10 px-4 py-10">
      <section>
        <h2 className="text-xl font-semibold mb-4">Architecture Overview</h2>
        <MiroEmbed />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">ETL Metrics (Demo)</h2>
        <AwsDataFlowChart chartType="area" />
      </section>
    </div>
  );
};

export default ArchitecturePage;
