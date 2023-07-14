export type containerProps = {
    borderRadius?: number,
    backgroundColor?: string,
    shadowColor?: string,
    shadowWidth?: number,
    shadowHeight?: number,
    shadowOpacity?: number
}

export type imageProps = {
    imgHeight?: number,
    imgWidth?: number,
    imgSrc: string
}

export type titleLabelProps = {
    titleText: string,
    titleFontSize?: number,
    titleTextColor?: string,
}

export type subTitleLabelProps = {
    subTitleText: string,
    subTitleFontSize?: number,
    subTitleTextColor?: string,
}

export type btnPrimaryProps = {
    btnPrimaryText: string,
    btnPrimaryFontSize?: number,
    btnPrimaryTextColor?: string,
    btnPrimaryBorderRadius?: number,
    btnPrimaryBgColor?: string,
    btnPrimaryOnClick?: Function
}

export type btnSecondaryProps = {
    btnSecondaryText: string,
    btnSecondaryFontSize?: number,
    btnSecondaryTextColor?: string,
    btnSecondaryBorderRadius?: number,
    btnSecondaryBgColor?: string,
    isShowbtnSecondary?: boolean,
    btnSecondaryOnClick?: Function
}