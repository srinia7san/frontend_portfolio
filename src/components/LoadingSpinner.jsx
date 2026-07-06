const LoadingSpinner = ({ text = "LOADING..." }) => {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 rounded-full animate-spin"
                style={{
                    borderColor: 'var(--color-border)',
                    borderTopColor: 'var(--color-primary)'
                }}></div>
            <p className="font-mono tracking-widest animate-pulse"
                style={{ color: 'var(--color-text)' }}>
                {text}
            </p>
        </div>
    );
};

export default LoadingSpinner;
