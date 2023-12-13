import React, { useState } from 'react';
import axios from 'axios';

const ImageViewer = ({ imageUrl }) => (
	<div>
		<p>Imagem carregada com sucesso!</p>
		<img src={imageUrl} alt='Imagem carregada' style={{ maxWidth: '100%' }} />
	</div>
);

const ImageUpload = () => {
	const [file, setFile] = useState(null);
	const [imageUrl, setImageUrl] = useState('');

	const handleFileChange = e => {
		setFile(e.target.files[0]);
	};

	const handleUpload = async (useAs: string) => {
		const formData = new FormData();
		formData.append('image', file);

		try {
			const response = await axios.post(`http://localhost:3001/upload-${useAs}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});

			// Se a resposta contiver a URL da imagem, atualize o estado
			if (response.data && response.data.imageUrl) {
				setImageUrl(response.data.imageUrl);
			}

			console.log('Upload bem-sucedido!');
		} catch (error) {
			console.error('Erro ao fazer upload:', error);
		}
	};

	return (
		<div>
			<input type='file' onChange={handleFileChange} />
			<button onClick={() => handleUpload('profile')}>Usar como Perfil</button>
			<button onClick={() => handleUpload('background')}>Usar como Background</button>

			{imageUrl && <ImageViewer imageUrl={imageUrl} />}
		</div>
	);
};

export default ImageUpload;
