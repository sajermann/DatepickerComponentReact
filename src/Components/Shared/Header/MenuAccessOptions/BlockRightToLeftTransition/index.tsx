import { motion } from 'framer-motion';

type Props = {
  show: boolean;
  children: React.ReactNode;
  width: string | number;
};

export default function _BlockRightToLeftTransition({
  show,
  children,
  width,
}: Props) {
  return (
    <motion.div
      animate={{ width: show ? width : 0 }}
      transition={{ duration: 0.1, origin: 0 }}
      style={{ overflow: 'hidden' }}
    >
      {children}
    </motion.div>
  );
}
