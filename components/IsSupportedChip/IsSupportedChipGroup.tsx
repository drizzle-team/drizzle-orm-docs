import IsSupportedChip from './IsSupportedChip';
import styles from './IsSupportedChip.module.css';

interface Props {
  chips: Record<string, boolean>;
  joined?: boolean;
}

const IsSupportedChipGroup:React.FC<Props> = ({ chips, joined }) => (
  <div className={`${styles['is-supported-chip-group']} ${joined ? styles['is-supported-chip-group-joined'] : ''}`}>
    {
        Object.entries(chips).map(([text, isSupported]) => (
          <IsSupportedChip isSupported={isSupported} text={text} />
        ))
    }
  </div>
);

export default IsSupportedChipGroup;
