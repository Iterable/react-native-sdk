import type { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '../constants';

export enum BannerVariant {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
  Success = 'success',
}

const icons = {
  [BannerVariant.Info]: 'information-circle',
  [BannerVariant.Error]: 'alert-circle',
  [BannerVariant.Warning]: 'alert-circle',
  [BannerVariant.Success]: 'checkmark-circle',
};

const variantStyles = {
  container: {
    [BannerVariant.Info]: {
      backgroundColor: colors.backgroundInfoSubtle,
      borderColor: colors.borderInfoSubtle,
    },
    [BannerVariant.Error]: {
      backgroundColor: colors.backgroundDestructiveSubtle,
      borderColor: colors.borderDestructiveSubtle,
    },
    [BannerVariant.Warning]: {
      backgroundColor: colors.backgroundWarningSubtle,
      borderColor: colors.borderWarningSubtle,
    },
    [BannerVariant.Success]: {
      backgroundColor: colors.backgroundSuccessSubtle,
      borderColor: colors.borderSuccessSubtle,
    },
  },
  text: {
    [BannerVariant.Info]: {
      color: colors.textInfo,
    },
    [BannerVariant.Error]: {
      color: colors.textDestructive,
    },
    [BannerVariant.Warning]: {
      color: colors.textWarning,
    },
    [BannerVariant.Success]: {
      color: colors.textSuccess,
    },
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 400,
    flex: 1,
  },
  prefix: {
    fontWeight: 'bold',
  },
});

const prefix = {
  [BannerVariant.Info]: '',
  [BannerVariant.Error]: 'ERROR: ',
  [BannerVariant.Warning]: 'WARNING: ',
  [BannerVariant.Success]: 'Success! ',
};

export interface BannerProps {
  variant?: BannerVariant;
  showPrefix?: boolean;
}

export const Banner = ({
  variant = BannerVariant.Info,
  showPrefix = true,
  children,
}: PropsWithChildren<BannerProps>) => {
  return (
    <View style={[styles.container, variantStyles.container[variant]]}>
      <Icon
        name={icons[variant]}
        size={20}
        color={variantStyles.text[variant].color}
      />
      <Text style={[styles.text, variantStyles.text[variant]]}>
        {showPrefix && <Text style={styles.prefix}>{prefix[variant]}</Text>}
        {children}
      </Text>
    </View>
  );
};

export default Banner;
