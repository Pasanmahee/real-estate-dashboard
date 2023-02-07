import styles from "./index.less";
import { Card } from "antd";
import { BuildOutlined, HomeOutlined } from '@ant-design/icons';
import ChartCard from '../components/ChartCard';

export default ({ total_properties, total_for_sale, total_for_rent }) => (
  <Card title="Summary" style={{ marginBottom: 24 }}>
    <Card.Grid className={styles.CardGrid}>
      <ChartCard
        bordered={false}
        title="Total Properties"
        action={
          <BuildOutlined />
        }
        total={total_properties}
      >
      </ChartCard>
    </Card.Grid>
    <Card.Grid className={styles.CardGrid}>
      <ChartCard
        bordered={false}
        title="Total For Sale"
        action={
          <HomeOutlined />
        }
        total={total_for_sale}
      >
      </ChartCard>
    </Card.Grid>
    <Card.Grid className={styles.CardGrid}>
      <ChartCard
        bordered={false}
        title="Total For Rent"
        action={
          <HomeOutlined />
        }
        total={total_for_rent}
      >
      </ChartCard>
    </Card.Grid>
  </Card>
);
