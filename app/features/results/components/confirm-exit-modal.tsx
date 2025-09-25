import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { IconCross } from '~/components/ui/icons';
import { useUserFlowExit } from '~/features/user-flow/hooks/use-user-flow-exit';
import theme from '~/styles/theme';
import React from 'react';
import { IconExit } from '~/components/ui/icons/icon-exit';

type ConfirmExitModalProps = {
  open: boolean;
  onClose: () => void;
  userId: string;
};

export const ConfirmExitModal = ({
  open,
  onClose,
  userId,
}: ConfirmExitModalProps) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const userFlowExitMutation = useUserFlowExit();

  // const pressExitButton = () => {
  //   const userFlowExit = {
  //     filters: filters,
  //     final_recommendations: filteredMatches,
  //   };
  //
  //   if (userId) {
  //     userFlowExitMutation.mutate(
  //       {
  //         userId,
  //         data: userFlowExit,
  //       },
  //       {
  //         onSuccess: () => {
  //           navigate('/');
  //         },
  //         onError: (error) => {
  //           console.error('Failed to send user flow exit data:', error);
  //           navigate('/');
  //         },
  //       },
  //     );
  //   } else {
  //     console.warn('No user ID available for user flow exit tracking');
  //     navigate('/');
  //   }
  // };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      className="p-20"
      PaperProps={{
        sx: {
          borderRadius: '20px',
        },
      }}
    >
      <IconButton
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 10,
        }}
      >
        <IconCross width={30} height={30} color="#1E1E1E" />
      </IconButton>
      <DialogContent
        className="flex flex-col gap-10 bg-white text-center items-center"
        style={{
          padding: '48px',
          paddingTop: '80px',
          borderRadius: '20px',
        }}
      >
        <IconExit />
        <Typography
          variant="h3"
          fontWeight={600}
          color="text.primary"
          className="mb-2"
        >
          {t('results.confirmExitModal.title')}
        </Typography>
        <div className="w-full flex flex-col gap-6">
          <Button
            variant="contained"
            size="medium"
            onClick={onClose}
            style={{
              fontSize: '20px',
              fontWeight: 600,
            }}
          >
            {t('results.confirmExitModal.cancelButton')}
          </Button>
          <Button
            variant="outlined"
            size="medium"
            className="font-semibold text-xl"
            onClick={() => navigate('/')}
            style={{
              fontSize: '20px',
              fontWeight: 600,
            }}
          >
            {t('results.confirmExitModal.confirmButton')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
