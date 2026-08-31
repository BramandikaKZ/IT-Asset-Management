function StatCard({ title, value, loading = false, columnClass = "col-12 col-md-4" }) {
    return (
        <div className={`${columnClass} mb-3`}>
            <div className="card shadow-sm h-100">
                <div className="card-body">
                    <h5 className="text-muted">{title}</h5>
                    <h2 className="mb-0">{loading ? "..." : value}</h2>
                </div>
            </div>
        </div>
    );
}

export default StatCard;