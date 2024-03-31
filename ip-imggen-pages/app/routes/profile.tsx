interface ProfileCardProps {
	name: string;
	hobby: string;
	favoriteFood: string;
	favoriteMovie: string;
	iconUrl: string;
	favoritePlace: string;
}

const ProfileCard = ({
	name,
	hobby,
	favoriteFood,
	favoriteMovie,
	iconUrl,
	favoritePlace,
}: ProfileCardProps) => {
	return (
		<div style={styles.card}>
			<div style={styles.iconContainer}>
				<img src={iconUrl} alt="Profile Icon" style={styles.icon} />
				<h2 style={styles.name}>{name}</h2>
			</div>
			<div style={styles.infoContainer}>
				<div style={styles.infoItem}>
					<span style={styles.infoLabel}>趣味</span>
					<span style={styles.infoValue}>{hobby}</span>
				</div>
				<div style={styles.infoItem}>
					<span style={styles.infoLabel}>好きな食べ物</span>
					<span style={styles.infoValue}>{favoriteFood}</span>
				</div>
				<div style={styles.infoItem}>
					<span style={styles.infoLabel}>好きな映画</span>
					<span style={styles.infoValue}>{favoriteMovie}</span>
				</div>
				<div style={styles.infoItem}>
					<span style={styles.infoLabel}>お気に入りの場所</span>
					<span style={styles.infoValue}>{favoritePlace}</span>
				</div>
			</div>
		</div>
	);
};

const styles = {
	card: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "350px",
		padding: "20px",
		borderRadius: "10px",
		boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
		backgroundColor: "#e6f2ff",
	},
	iconContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginBottom: "20px",
	},
	icon: {
		width: "120px",
		height: "120px",
		borderRadius: "50%",
		objectFit: "cover",
		border: "3px solid #8c9db5",
	},
	name: {
		fontSize: "24px",
		fontWeight: "bold",
		marginTop: "10px",
		textAlign: "center",
	},
	infoContainer: {
		width: "100%",
	},
	infoItem: {
		display: "flex",
		flexDirection: "column",
		marginBottom: "25px",
		height: "50px",
	},
	infoLabel: {
		fontSize: "12px",
		fontWeight: "bold",
		color: "#8c9db5",
	},
	infoValue: {
		fontSize: "18px",
		display: "flex",
		alignItems: "center",
	},
};

const FormPage = () => {
	return (
		<ProfileCard
			name={"John Doe"}
			hobby={"Programming"}
			favoriteFood={"海鮮丼ああああああああああ いいいいいいいい"}
			favoriteMovie={"SFやファンタジーああああああああああいいいいいいいい"}
			iconUrl="https://avatars.githubusercontent.com/u/44711725?v=4"
			favoritePlace={"日本の京都の祇園地区"}
		/>
	);
};
export default FormPage;
