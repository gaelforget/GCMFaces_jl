var documenterSearchIndex = {"docs":
[{"location":"#MeshArrays.jl-documentation-1","page":"MeshArrays.jl documentation","title":"MeshArrays.jl documentation","text":"","category":"section"},{"location":"#","page":"MeshArrays.jl documentation","title":"MeshArrays.jl documentation","text":"MeshArrays.jl primarily defines composite types that embed inter-connected array collections within a struct and provides an exchange function that effectively transfers data between connected arrays. It was originally introduced, as gcmfaces.jl, in this JuliaCon-2018 presentation (see below for notebooks). Note: even though MeshArrays.jl is registered, documented, archived, and routinely tested, it is still regarded as a preliminary implementation.","category":"page"},{"location":"#Contents-1","page":"MeshArrays.jl documentation","title":"Contents","text":"","category":"section"},{"location":"#","page":"MeshArrays.jl documentation","title":"MeshArrays.jl documentation","text":"","category":"page"},{"location":"#Installation-1","page":"MeshArrays.jl documentation","title":"Installation","text":"","category":"section"},{"location":"#","page":"MeshArrays.jl documentation","title":"MeshArrays.jl documentation","text":"using Pkg\nPkg.add(\"MeshArrays\")\nPkg.test(\"MeshArrays\")","category":"page"},{"location":"#","page":"MeshArrays.jl documentation","title":"MeshArrays.jl documentation","text":"Note: Julia's package manager is documented here within docs.julialang.org.","category":"page"},{"location":"#Use-examples-1","page":"MeshArrays.jl documentation","title":"Use examples","text":"","category":"section"},{"location":"#","page":"MeshArrays.jl documentation","title":"MeshArrays.jl documentation","text":"The JuliaCon-2018 presentation relied on two Jupyter notebooks privided in the JuliaCon2018Notebooks repo and pre-defined grids that that can be downloaded as follows:","category":"page"},{"location":"#","page":"MeshArrays.jl documentation","title":"MeshArrays.jl documentation","text":"git clone https://github.com/gaelforget/GRID_CS32\ngit clone https://github.com/gaelforget/GRID_LLC90","category":"page"},{"location":"#","page":"MeshArrays.jl documentation","title":"MeshArrays.jl documentation","text":"At the command line, one can reproduce the same computation as follows:","category":"page"},{"location":"#","page":"MeshArrays.jl documentation","title":"MeshArrays.jl documentation","text":"using MeshArrays\nisdir(\"GRID_LLC90\") ? GridVariables=GCMGridLoad(GCMGridSpec(\"LLC90\")) : GridVariables=GCMGridOnes(\"cs\",6,100);\n                    \n(Rini,Rend,DXCsm,DYCsm)= MeshArrays.demo2(GridVariables);","category":"page"},{"location":"#","page":"MeshArrays.jl documentation","title":"MeshArrays.jl documentation","text":"For plotting directions, see the help section (?MeshArrays.demo2). Additional demos are also provided (e.g., see ?MeshArrays.demo1, ?MeshArrays.demo3).","category":"page"},{"location":"#Main-Features-1","page":"MeshArrays.jl documentation","title":"Main Features","text":"","category":"section"},{"location":"#","page":"MeshArrays.jl documentation","title":"MeshArrays.jl documentation","text":"MeshArrays.jl composite types contain array collections where arrays are typically inter-connected at their edges. It provides exchange functions that transfer data between neighbor arrays so that the user can extend the domain of computation as needed e.g. for interpolation or to compute spatial derivatives.","category":"page"},{"location":"#","page":"MeshArrays.jl documentation","title":"MeshArrays.jl documentation","text":"The composite types specify how each array collection forms a mesh and provide information to allow exchange to dispatch to the appropriate method. Various configurations that are commonly used in Earth System Models are implemented using the concrete type called gcmfaces. This type contains a gcmgrid instance that provides grid specifications (incl. location on disk). Embedded arrays, or meshes, each represent a subdomain within, e.g., an Earth System Model grid.","category":"page"},{"location":"#","page":"MeshArrays.jl documentation","title":"MeshArrays.jl documentation","text":"About names: the gcmfaces name derives from a previous Matlab / Octave package, introduced in Forget et al., 2015 (doi:10.5194/gmd-8-3071-2015), which provided the inspiratoin for MeshArrays.jl. To break it down, GCM is an acronym for General Circulation Model, or Global Climate Model (see this wikipedia entry), and faces can mean meshes, arrays, facets, or subdomains.","category":"page"},{"location":"#API-index-1","page":"MeshArrays.jl documentation","title":"API index","text":"","category":"section"},{"location":"#","page":"MeshArrays.jl documentation","title":"MeshArrays.jl documentation","text":"","category":"page"},{"location":"#API-details-1","page":"MeshArrays.jl documentation","title":"API details","text":"","category":"section"},{"location":"#","page":"MeshArrays.jl documentation","title":"MeshArrays.jl documentation","text":"Modules = [MeshArrays]\nOrder   = [:type,:function]","category":"page"},{"location":"#MeshArrays.gcmfaces","page":"MeshArrays.jl documentation","title":"MeshArrays.gcmfaces","text":"gcmfaces{T, N}\n\ngcmfaces data structure. Available constructors:\n\ngcmfaces{T,N}(grid::gcmgrid,f::Array{Array{T,N},1},\n         fSize::Array{NTuple{N, Int}}, aSize::NTuple{N,Int})\ngcmfaces(grid::gcmgrid,v1::Array{Array{T,N},1}) where {T,N}\ngcmfaces(A::AbstractGcmfaces{T, N}) where {T,N}\n\ngcmfaces(grid::gcmgrid,,::Type{T},\n         fSize::Array{NTuple{N, Int}}, aSize::NTuple{N,Int}) where {T,N}\ngcmfaces(grid::gcmgrid)\ngcmfaces()\n\n\n\n\n\n","category":"type"},{"location":"#MeshArrays.gcmgrid","page":"MeshArrays.jl documentation","title":"MeshArrays.gcmgrid","text":"gcmgrid\n\ngcmgrid data structure. Available constructors:\n\ngcmgrid(path::String, class::String, nFaces::Int,\n        fSize::Array{NTuple{2, Int},1}, ioSize::Array{Int64,2},\n        ioPrec::Type, read::Function)\n\n\n\n\n\n","category":"type"},{"location":"#MeshArrays.gcmsubset","page":"MeshArrays.jl documentation","title":"MeshArrays.gcmsubset","text":"gcmsubset{T, N}\n\ngcmsubset data structure. Available constructors:\n\ngcmsubset{T,N}(grid::gcmgrid,f::Array{Array{T,N},1},\n               fSize::Array{NTuple{N, Int}},aSize::NTuple{N, Int},\n               i::Array{Array{T,N},1},iSize::Array{NTuple{N, Int}})\ngcmsubset(grid::gcmgrid,::Type{T},fSize::Array{NTuple{N, Int}},\n          aSize::NTuple{N,Int},dims::NTuple{N,Int}) where {T,N}\n\n\n\n\n\n","category":"type"},{"location":"#MeshArrays.GCMGridLoad-Tuple{gcmgrid}","page":"MeshArrays.jl documentation","title":"MeshArrays.GCMGridLoad","text":"GCMGridLoad(mygrid::gcmgrid)\n\nReturn a Dict of grid variables read from files located in mygrid.path (see ?GCMGridSpec).\n\nBased on the MITgcm naming convention, grid variables are:\n\nXC, XG, YC, YG, AngleCS, AngleSN, hFacC, hFacS, hFacW, Depth.\nRAC, RAW, RAS, RAZ, DXC, DXG, DYC, DYG.\nDRC, DRF, RC, RF (one-dimensional)\n\n\n\n\n\n","category":"method"},{"location":"#MeshArrays.GCMGridOnes-Tuple{Any,Any,Any}","page":"MeshArrays.jl documentation","title":"MeshArrays.GCMGridOnes","text":"GCMGridOnes(grTp,nF,nP)\n\nDefine all-ones grid variables instead of using GCMGridSpec & GCMGridLoad.\n\n\n\n\n\n","category":"method"},{"location":"#MeshArrays.GCMGridSpec","page":"MeshArrays.jl documentation","title":"MeshArrays.GCMGridSpec","text":"GCMGridSpec(gridName)\n\nReturn a gmcgrid specification that provides grid files path, class, nFaces, ioSize, facesSize, ioPrec, & a read function (not yet) using hard-coded values for \"LLC90\", \"CS32\", \"LL360\" (for now).\n\n\n\n\n\n","category":"function"},{"location":"#MeshArrays.LatitudeCircles-Tuple{Any,Dict}","page":"MeshArrays.jl documentation","title":"MeshArrays.LatitudeCircles","text":"LatitudeCircles(LatValues,GridVariables::Dict)\n\nCompute integration paths that follow latitude circles\n\n\n\n\n\n","category":"method"},{"location":"#MeshArrays.ThroughFlow-Tuple{Any,Any,Dict}","page":"MeshArrays.jl documentation","title":"MeshArrays.ThroughFlow","text":"ThroughFlow(VectorField,IntegralPath,GridVariables::Dict)\n\nCompute transport through an integration path\n\n\n\n\n\n","category":"method"},{"location":"#MeshArrays.convergence-Tuple{gcmfaces,gcmfaces}","page":"MeshArrays.jl documentation","title":"MeshArrays.convergence","text":"convergence(uFLD::gcmfaces,vFLD::gcmfaces)\n\nCompute convergence of a vector field\n\n\n\n\n\n","category":"method"},{"location":"#MeshArrays.convert2array-Tuple{gcmfaces}","page":"MeshArrays.jl documentation","title":"MeshArrays.convert2array","text":"convert2array(fld::gcmfaces)\n\nConvert gcmfaces to array (or vice versa otherwise)\n\n\n\n\n\n","category":"method"},{"location":"#MeshArrays.convert2gcmfaces-Tuple{gcmfaces}","page":"MeshArrays.jl documentation","title":"MeshArrays.convert2gcmfaces","text":"convert2gcmfaces(fld::gcmfaces)\n\nConvert mitgcm output to gcmfaces (or vice versa otherwise)\n\n\n\n\n\n","category":"method"},{"location":"#MeshArrays.exchange-Tuple{gcmfaces}","page":"MeshArrays.jl documentation","title":"MeshArrays.exchange","text":"exchange(fld::gcmfaces)\n\nExchange / transfer data between neighboring arrays. Other methods are\n\nexchange(fld::gcmfaces,N::Integer)\nexchange(u::gcmfaces,v::gcmfaces)\nexchange(u::gcmfaces,v::gcmfaces,N::Integer)\n\n\n\n\n\n","category":"method"},{"location":"#MeshArrays.fijind-Tuple{gcmfaces,Int64}","page":"MeshArrays.jl documentation","title":"MeshArrays.fijind","text":"fijind(A::gcmfaces,ij::Int)\n\nCompute face and local indices (f,j,k) from global index (ij).\n\n\n\n\n\n","category":"method"},{"location":"#MeshArrays.findtiles","page":"MeshArrays.jl documentation","title":"MeshArrays.findtiles","text":"findtiles(ni,nj,grid=\"llc90\")\n\nReturn a gcmfaces map of tile indices for tile size ni,nj\n\n\n\n\n\n","category":"function"},{"location":"#MeshArrays.fsize-Union{Tuple{AbstractGcmfaces{T,N}}, Tuple{N}, Tuple{T}} where N where T","page":"MeshArrays.jl documentation","title":"MeshArrays.fsize","text":"fsize(A::AbstractGcmfaces{T, N}) where {T,N}\n\nReturn vector of face array sizes. Other methods:\n\nfsize(A::AbstractGcmfaces{T, N},i::Int) where {T,N}\nfsize(A::Array{Array{T,N},1}) where {T,N}\nfsize(A::Array{Array{T,N},1},i::Int) where {T,N}\n\n\n\n\n\n","category":"method"},{"location":"#MeshArrays.gradient-Tuple{gcmfaces,Dict}","page":"MeshArrays.jl documentation","title":"MeshArrays.gradient","text":"gradient(inFLD::gcmfaces,GridVariables::Dict)\n\nCompute spatial derivatives. Other methods:\n\ngradient(inFLD::gcmfaces,GridVariables::Dict,doDIV::Bool)\ngradient(inFLD::gcmfaces,iDXC::gcmfaces,iDYC::gcmfaces)\n\n\n\n\n\n","category":"method"},{"location":"#MeshArrays.mask-Tuple{gcmfaces,Number}","page":"MeshArrays.jl documentation","title":"MeshArrays.mask","text":"mask(fld::gcmfaces, val::Number)\n\nReplace non finite values with val. Other methods:\n\nmask(fld::gcmfaces)\nmask(fld::gcmfaces, val::Number, noval::Number)\n\n\n\n\n\n","category":"method"},{"location":"#MeshArrays.read_bin-Tuple{String,Union{Missing, Int64},Union{Missing, Int64},DataType,gcmgrid}","page":"MeshArrays.jl documentation","title":"MeshArrays.read_bin","text":"read_bin(fil::String,kt::Union{Int,Missing},kk::Union{Int,Missing},prec::DataType,mygrid::gcmgrid)\n\nRead model output from binary file and convert to gcmfaces structure. Other methods:\n\nread_bin(fil::String,prec::DataType,mygrid::gcmgrid)\nread_bin(fil::String,mygrid::gcmgrid)\n\n\n\n\n\n","category":"method"},{"location":"#MeshArrays.smooth-Tuple{gcmfaces,gcmfaces,gcmfaces,Dict}","page":"MeshArrays.jl documentation","title":"MeshArrays.smooth","text":"smooth(FLD::gcmfaces,DXCsm::gcmfaces,DYCsm::gcmfaces,GridVariables::Dict)\n\nSmooth out scales below DXCsm / DYCsm via diffusion\n\n\n\n\n\n","category":"method"},{"location":"#MeshArrays.demo1-Tuple{String}","page":"MeshArrays.jl documentation","title":"MeshArrays.demo1","text":"demo1(gridChoice::String)\n\nDemonstrate basic functionalities (load grid, arithmetic, exchange, gradient, etc.). Call sequence:\n\n!isdir(\"GRID_LLC90\") ? error(\"missing files\") : nothing\n\n(D,Dexch,Darr,DD)=MeshArrays.demo1(\"LLC90\");\n\n\n\n\n\n","category":"method"},{"location":"#MeshArrays.demo2-Tuple{}","page":"MeshArrays.jl documentation","title":"MeshArrays.demo2","text":"demo2()\n\nDemonstrate higher level functions using smooth. Call sequence:\n\n(Rini,Rend,DXCsm,DYCsm)=MeshArrays.demo2();\n\ninclude(joinpath(dirname(pathof(MeshArrays)),\"gcmfaces_plot.jl\"))\nqwckplot(Rini)\nqwckplot(Rend)\n\n\n\n\n\n","category":"method"},{"location":"#MeshArrays.demo3-Tuple{}","page":"MeshArrays.jl documentation","title":"MeshArrays.demo3","text":"demo3()\n\nDemonstrate ocean transport computations. Call sequence:\n\n(UV,LC,Tr)=MeshArrays.demo3();\nusing Plots; plot(Tr/1e6,title=\"meridional transport\")\n\ninclude(joinpath(dirname(pathof(MeshArrays)),\"gcmfaces_plot.jl\"))\nqwckplot(UV[\"U\"][:,:,1,1],\"U component (note varying face orientations)\")\nqwckplot(UV[\"V\"][:,:,1,1],\"V component (note varying face orientations)\")\n\n\n\n\n\n","category":"method"}]
}
